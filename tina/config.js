import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "e3776698-5168-4671-8e3b-9cf63a134a88",
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "", // O la carpeta donde esté tu index.html.
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "assets/images", // Carpeta donde se guardarán los archivos subidos
      publicFolder: "", // Carpeta pública donde se servirán los archivos
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "tienda",
        label: "Gestión de Tienda",
        path: "/", // Raíz donde está tu index.html
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: {
          include: "index.html",
        },
        fields: [
          {
            type: "string",
            name: "nombre_tienda",
            label: "Nombre de la Tienda",
          },
          {
            type: "object",
            list: true,
            name: "productos",
            label: "Lista de Productos",
            ui: {
              itemProps: (item) => ({ label: item?.nombre }),
            },
            fields: [
              { type: "string", name: "nombre", label: "Nombre del Pan" },
              { type: "string", name: "precio", label: "Precio (ej: $10.00)" },
              { type: "image", name: "imagen", label: "Foto del Producto" },
              {
                type: "string",
                name: "descripcion",
                label: "Descripción Corta",
              },
            ],
          },
          {
            type: "string",
            name: "body",
            label: "Código Base (No tocar)",
            isBody: true,
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
