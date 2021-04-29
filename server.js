import app from './app';

const port = 3333;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
  console.log(`CTRL + Clique on http://localhost:${port}`);
});
