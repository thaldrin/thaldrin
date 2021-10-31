// docker-compose up -d --no-deps --build $service
const { exec } = require('child_process');
const args = process.argv.slice(2)

console.log(`RUNNING rebuild with args:`, args);
exec(
    `docker-compose up -d --no-deps --build ${args[0]}`,
    (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.info(`stdout: ${stdout}`);
    }
);
