import { NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { portfolioConfig } from "@/config/portfolio.config";

export async function GET() {
  const customPdfPath = join(process.cwd(), "public", "resume.pdf");

  if (existsSync(customPdfPath)) {
    const pdfBuffer = readFileSync(customPdfPath);
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Shiv_Ram_Sharma_Resume.pdf"',
      },
    });
  }

  const skillsList = portfolioConfig.skills.items.map((s) => s.name).join(" · ");
  const experienceHtml = portfolioConfig.experience.items
    .map(
      (exp) => `
      <div style="margin-bottom:14px;">
        <strong>${exp.role}</strong> — ${exp.organization} <span style="color:#64748b;">(${exp.period})</span>
        <p style="margin:4px 0;color:#334155;">${exp.summary}</p>
      </div>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${portfolioConfig.brand.name} — Resume</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 820px; margin: 40px auto; padding: 0 24px; color: #0f172a; line-height: 1.55; }
    h1 { margin: 0; font-size: 28px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.12em; color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 26px; }
    .meta { color: #475569; font-size: 14px; margin-top: 4px; }
  </style>
</head>
<body>
  <h1>${portfolioConfig.brand.name}</h1>
  <div class="meta">${portfolioConfig.brand.designation} · ${portfolioConfig.brand.company}</div>
  <div class="meta">${portfolioConfig.brand.email} · ${portfolioConfig.brand.companyUrl}</div>

  <h2>Summary</h2>
  <p>${portfolioConfig.brand.tagline}</p>

  <h2>Experience & Journey</h2>
  ${experienceHtml}

  <h2>Technical Skills</h2>
  <p>${skillsList}</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Shiv_Ram_Sharma_Resume.html"',
    },
  });
}
