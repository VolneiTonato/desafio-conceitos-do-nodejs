const app = require("./app")

const port = 3333

app.listen(port)
.on("error", (err) => console.debug(`Server on Error ${String(err)}`))
.on("listening", () => console.debug(`Server listening on port: ${port}`))