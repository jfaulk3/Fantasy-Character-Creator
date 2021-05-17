import app from "./app";

const { PORT = 5000 } = process.env;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
