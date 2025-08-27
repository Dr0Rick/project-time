const ftp = require("basic-ftp")

async function main() {
  const client = new ftp.Client(30000) // 30s timeout
  client.ftp.verbose = true            // log all steps
  try {
    await client.access({
      host: "ftpupload.net",
      port: 21,
      user: process.env.INF_FTP_USER,
      password: process.env.INF_FTP_PASS,
      secure: true, // explicit FTPS
      // Some networks/proxies break TLS chain; this relaxes cert check:
      secureOptions: { rejectUnauthorized: false }
    })
    await client.cd("/htdocs")
    await client.uploadFrom("index.html", "index.html")
    console.log("✅ Uploaded index.html")
  } catch (e) {
    console.error("❌ FTP error:", e)
  }
  client.close()
}

main()
