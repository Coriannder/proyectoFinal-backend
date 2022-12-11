import yargs from  'yargs'

export const { mode , persistance } = yargs(process.argv.slice(2))
    .alias({
        m: 'mode',
        pers: 'persistance'
    })
    .default({
        mode: 'fork',
        persistance: 'mongo'
    })
    .argv