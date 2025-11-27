encrypt_files() {
    echo -e "🔐 Cifrando archivos...\n"
    echo -e "--------------------------------------------------------------------------------------------------\nCifrando frontend/.env ....\n"
    gpg --yes -o ./frontend/.env.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./frontend/.env
    echo -e "--------------------------------------------------------------------------------------------------\nCifrando backend/config.php ....\n"
    gpg --yes -o ./backend/config.php.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./backend/config.php
    echo -e "--------------------------------------------------------------------------------------------------"
    echo -e "✔ Archivo(s) cifrados correctamente."
}

decrypt_files() {
    echo -e "🔓 Desencriptando archivos...\n"
    echo -e "--------------------------------------------------------------------------------------------------\nDescifrando frontend/.env ....\n"
    gpg --yes -o ./frontend/.env -d ./frontend/.env.asc
    echo -e "--------------------------------------------------------------------------------------------------\nCifrando backend/config.php ....\n"
    gpg --yes -o ./backend/config.php -d ./backend/config.php.asc
    echo -e "--------------------------------------------------------------------------------------------------\n\n"
    echo -e "✔ Archivo(s) descifrados correctamente.\n"
}


clear

echo "=================================="
echo "          GPG Tools Script        "
echo "=================================="
echo "1) Cifrar variables de entorno"
echo "2) Descifrar variables de entorno"
echo "3) Salir"
echo "----------------------------------"

read -p "Elegí una opción: " option

case $option in
    1) encrypt_files;;
    2) decrypt_files;;
    3) echo -e "\nSaliendo...";;
    *) echo -e "\nOpción inválida.";;
esac