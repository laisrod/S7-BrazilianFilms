#!/bin/bash

# Scripts auxiliares para gerenciamento de branches Git
# Uso: source scripts/git-helpers.sh

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para criar branch seguindo convenções
create_branch() {
    local type=$1
    local name=$2
    
    if [ -z "$type" ] || [ -z "$name" ]; then
        echo -e "${RED}Uso: create_branch <tipo> <nome>${NC}"
        echo "Tipos: feature, refactor, fix, hotfix, chore"
        return 1
    fi
    
    # Sincronizar develop primeiro
    echo -e "${YELLOW}Sincronizando develop...${NC}"
    git checkout develop
    git pull origin develop
    
    # Criar branch
    local branch_name="${type}/${name}"
    git checkout -b "$branch_name"
    echo -e "${GREEN}Branch criada: $branch_name${NC}"
}

# Função para listar branches organizadas
list_branches() {
    echo -e "${GREEN}=== Branches Locais ===${NC}"
    git branch --sort=-committerdate | head -15
    
    echo -e "\n${GREEN}=== Branches Remotas ===${NC}"
    git branch -r --sort=-committerdate | head -15
    
    echo -e "\n${YELLOW}=== Branches que podem ser deletadas (mergeadas) ===${NC}"
    git branch --merged develop | grep -v 'develop\|main' || echo "Nenhuma branch mergeada para deletar"
}

# Função para limpar branches antigas
cleanup_branches() {
    echo -e "${YELLOW}Limpando branches remotas deletadas...${NC}"
    git fetch --prune
    
    echo -e "${YELLOW}Branches locais que podem ser deletadas:${NC}"
    git branch -vv | grep ': gone]' | awk '{print $1}' || echo "Nenhuma branch para limpar"
    
    read -p "Deletar essas branches? (s/N): " confirm
    if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
        git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
        echo -e "${GREEN}Branches deletadas!${NC}"
    fi
}

# Função para deletar branches mergeadas
delete_merged() {
    echo -e "${YELLOW}Branches mergeadas em develop:${NC}"
    git branch --merged develop | grep -v 'develop\|main' || echo "Nenhuma branch mergeada"
    
    read -p "Deletar essas branches? (s/N): " confirm
    if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
        git branch --merged develop | grep -v 'develop\|main' | xargs git branch -d
        echo -e "${GREEN}Branches deletadas!${NC}"
    fi
}

# Função para ver status de todas as branches
branch_status() {
    echo -e "${GREEN}=== Status das Branches ===${NC}\n"
    
    echo -e "${YELLOW}Branches locais:${NC}"
    git branch -vv | grep -v 'remotes'
    
    echo -e "\n${YELLOW}Últimos commits por branch:${NC}"
    git for-each-ref --sort=-committerdate refs/heads/ \
        --format='%(refname:short) - %(committerdate:relative) - %(subject)' | head -10
}

# Função para ver diferenças entre branch atual e develop
diff_dev() {
    local current_branch=$(git branch --show-current)
    echo -e "${GREEN}Diferenças entre $current_branch e develop:${NC}"
    git diff develop..HEAD --stat
}

# Menu interativo
git_menu() {
    while true; do
        echo -e "\n${GREEN}=== Git Branch Manager ===${NC}"
        echo "1. Listar branches"
        echo "2. Criar nova branch"
        echo "3. Limpar branches remotas deletadas"
        echo "4. Deletar branches mergeadas"
        echo "5. Ver status das branches"
        echo "6. Ver diferenças com develop"
        echo "7. Sair"
        
        read -p "Escolha uma opção: " option
        
        case $option in
            1) list_branches ;;
            2) 
                echo "Tipos: feature, refactor, fix, hotfix, chore"
                read -p "Tipo: " type
                read -p "Nome: " name
                create_branch "$type" "$name"
                ;;
            3) cleanup_branches ;;
            4) delete_merged ;;
            5) branch_status ;;
            6) diff_dev ;;
            7) break ;;
            *) echo -e "${RED}Opção inválida!${NC}" ;;
        esac
    done
}

# Exportar funções
export -f create_branch
export -f list_branches
export -f cleanup_branches
export -f delete_merged
export -f branch_status
export -f diff_dev
export -f git_menu

echo -e "${GREEN}Git helpers carregados!${NC}"
echo "Use 'git_menu' para menu interativo"
echo "Ou use as funções diretamente: create_branch, list_branches, etc."

