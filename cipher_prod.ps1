# Encrypta con subclave y con anillo
gpg --yes -o ./frontend/.env.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./frontend/.env
gpg --yes -o ./backend/config.php.asc -u $signID! -r $encID! -r $enc2ID! --sign --encrypt ./backend/config.php

# Encrypta solo con subclave
# gpg --yes -o ./frontend/.env.asc -u $signID! -r $encID! --sign --encrypt ./frontend/.env
# gpg --yes -o ./backend/config.php.asc -u $signID! -r $encID! --sign --encrypt ./backend/config.php