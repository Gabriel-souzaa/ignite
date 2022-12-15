import { myDataSource } from './data-source';

(async () => {
  await myDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch(err => {
      console.error('Error during Data Source initialization:', err);
    });
})();
