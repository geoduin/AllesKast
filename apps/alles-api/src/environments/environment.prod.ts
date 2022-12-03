export const environment = {
  production: true,
  Database:`mongodb+srv://SoyaDim:${process.env["MONGO_CODE"]}@soyamelk.lhjagfr.mongodb.net/?retryWrites=true&w=majority`,
  Key: `${process.env["JWT_KEY"]}`
};
