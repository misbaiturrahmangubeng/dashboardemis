export async function fetchFromSpreadsheet(action: string, payload: any = {}) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL!;
  const secret = process.env.GAS_SECRET_KEY!;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret,
      action,
      payload,
    }),
    // Cache revalidation strategi untuk optimasi performa
    next: { revalidate: 60 } 
  });

  if (!response.ok) {
    throw new Error("Gagal terhubung ke database Spreadsheet");
  }

  return response.json();
}
