import fs from "fs/promises";
import path from "path";

async function main() {
  const { slides } = JSON.parse(
    await fs.readFile("slides.json", { encoding: "utf-8" }),
  );
  const dirname = new URL(".", import.meta.url).pathname;
  const distDir = path.join(dirname, "build");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta property="og:title" content="スライド | uki00a.github.io">
<meta name="description" content="スライドの一覧">
<meta property="og:description" content="スライドの一覧">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta property="og:url" content="https://uki00a.github.io/slides/">
<title>スライド | uki00a.github.io</title>
<link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
</head>
<body>
<h1>スライド</h1>
<ul>
${
    slides.map(({ path, title }) => (
      `<li><a href="https://uki00a.github.io${path}">${title}</a></li>`
    )).join("\n")
  }
</ul>
</body>
</html>`;
  await fs.writeFile(path.join(distDir, "index.html"), html);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
