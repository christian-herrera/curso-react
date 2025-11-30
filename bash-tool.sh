encrypt_files() {
    clear
    echo "⚠️  ADVERTENCIA: Vas a sobrescribir las credenciales cifradas de PRODUCCIÓN ⚠️"
    echo "------------------------------------------------------------------------------"
    echo "Se generarán nuevos archivos:"
    echo "  - frontend/.env.prod.asc"
    echo "  - backend/config.prod.php.asc"
    echo ""
    echo "Esto se hará usando el contenido ACTUAL de:"
    echo "  - frontend/.env"
    echo "  - backend/config.php"
    echo ""
    read -p "Estás seguro de proceder? (s/N): " confirm

    if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
        echo -e "\n❌ Operación cancelada. No se modificó ningún archivo.\n\n"
    fi

    echo -e "\n🔐 Cifrando archivos...\n"
    echo -e "--------------------------------------------------------------------------------------------------"
    echo -e "Cifrando frontend/.env ...."
    gpg --yes -o ./frontend/.env.prod.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./frontend/.env
    echo -e "--------------------------------------------------------------------------------------------------"
    echo -e "Cifrando backend/config.php ...."
    gpg --yes -o ./backend/config.prod.php.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./backend/config.php
    echo -e "--------------------------------------------------------------------------------------------------"
    echo -e "\n🔐 Archivo(s) cifrados correctamente.\n\n"
}


apply_dev_files() {
    clear
    echo -e "\n\n⚙️  Aplicando configuración de desarrollo...\n"
    cp ./frontend/.env.dev ./frontend/.env
    cp ./backend/config.dev.php ./backend/config.php
    echo -e "\n🚧Configuración de desarrollo aplicada correctamente.\n\n"
}

apply_prod_files() {
    clear
    echo -e "\n\n🚀 Aplicando configuración de producción...\n"
    echo -e "--------------------------------------------------------------------------------------------------\nDescifrando frontend/.env ....\n"
    gpg --yes -o ./frontend/.env -d ./frontend/.env.prod.asc
    echo -e "--------------------------------------------------------------------------------------------------\nDescifrando backend/config.php ....\n"
    gpg --yes -o ./backend/config.php -d ./backend/config.prod.php.asc

    echo -e "\n--------------------------------------------------------------------------------------------------"
    echo -e "\n🔓 Configuración de producción aplicada correctamente.\n\n"
}


deploy_gh_pages() {
    clear
    echo -e "\n📦 Desplegando a GitHub Pages..."
    echo -e "------------------------------------------------------------------------------"
    docker exec -it vite npm run build
    echo -e "\n------------------------------------------------------------------------------"
    read -p "Build ejecutado, subir a GitHub Pages? (s/N): " confirm

    # Exit si no confirma
    if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
        echo -e "\n❌ Operación cancelada. No se realizó el despliegue.\n\n"
        return
    fi

    # Deploy
    clear
    echo -e "\n🏗️ Preparando deploy..."
    echo -e "------------------------------------------------------------------------------"

    # Worktree temporario para gh-pages
    if [[ -d ".git/worktrees/gh-pages" ]]; then
        echo -e "\n🧹 Eliminando worktree previo...\n"
        git worktree remove gh-pages --force 2>/dev/null
    fi
    
    echo -e "\n📦 Generando worktree temporal...\n"
    rm -rf gh-pages
    git worktree add gh-pages gh-pages
    find gh-pages -mindepth 1 ! -name ".git" -exec rm -rf {} +  # Elimino todo excepto .git
    cp -r ./frontend/dist/* ./gh-pages/

    # Commit
    echo -e "\n\n⚙️ Realizando commit...\n"
    cd gh-pages
    git add .
    git commit -m "Auto-Deploy - $(date +"%Y-%m-%d %H:%M:%S")" || {
        echo -e "\n⚠️  Nada para commitear"
        echo -e "  ↳ El build es identico a la version actual de producción!\n"
        return
    }

    # Push
    echo -e "\n\n🚀 Realizando push en la rama gh-pages...\n"
    git push origin gh-pages
    cd ..

    # Limpieza
    echo -e "\n🧹 Realizando limpieza...\n"
    git worktree remove gh-pages --force
    rm -rf gh-pages

    echo -e "\n🚨 Despliegue completado correctamente."
    echo -e "  ↳ Consultar en: https://github.com/christian-herrera/curso-react/tree/gh-pages\n\n"
}

                                           
                                           
clear

echo -e "\e[36m     ____             __       ______            __   \e[0m"
echo -e "\e[34m    / __ )____ ______/ /_     /_  __/___  ____  / /   \e[0m"
echo -e "\e[32m   / __  / __ \`/ ___/ __ \     / / / __ \/ __ \/ /   \e[0m"
echo -e "\e[33m  / /_/ / /_/ (__  ) / / /    / / / /_/ / /_/ / /     \e[0m"
echo -e "\e[35m /_____/\__,_/____/_/ /_/    /_/  \____/\____/_/      \e[0m"
echo -e "\e[31m                                                      \e[0m"
echo "1) Colocar variables de producción"
echo "2) Colocar variables de desarrollo"
echo "3) Cifrar archivos (.env, config.php)"
echo "4) Subir a GitHub Pages"
echo "5) Salir"
echo "--------------------------------------"
read -p "Que desea realizar?: " option

case $option in
    1) apply_prod_files;;
    2) apply_dev_files;;
    3) encrypt_files;;
    4) deploy_gh_pages;;
    5) echo -e "\nSaliendo...";;
    *) echo -e "\nOpción inválida.";;
esac
