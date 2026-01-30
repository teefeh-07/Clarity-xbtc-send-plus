const { execSync } = require('child_process');

const run = (cmd) => {
    console.log(`> ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed: ${cmd}`);
    }
};

async function main() {
    // Push main branch
    run('git push -u origin main --force');

    // Push all branches
    run('git push --all origin');

    // Push tags if any
    run('git push --tags origin');

    console.log('\nAll branches pushed to remote!');
}

main();
