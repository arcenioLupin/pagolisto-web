# ControlWallet Frontend

**ControlWallet** es una solución de **FloweyPay** que centraliza los cobros realizados con billeteras digitales como **Yape**, **Plin** y otras, permitiendo a pequeños comercios gestionar sus ventas desde un solo panel.

Este repositorio contiene el **frontend** de ControlWallet, construido con **React**, **TypeScript** y **Vite**, e integrado con el backend de ControlWallet desplegado en la nube.

---

## 🚀 Objetivo del MVP

El objetivo del MVP de ControlWallet es permitir que un comercio pueda:

- Registrar **cobros directos** (*charges*).
- Crear y gestionar **solicitudes de pago** (*payment requests*).
- Enviar un **link público** al cliente para que pueda pagar y marcar el pago como realizado.
- Visualizar un **resumen de ventas** y estado de sus cobros en un dashboard simple.
- Configurar sus datos de comercio, métodos de pago y QR de Yape/Plin.

---

## 🧱 Tecnologías principales

Este frontend está construido con:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/) – UI components
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – Formularios y validaciones
- [Zustand](https://zustand-demo.pmnd.rs/) – Estado global
- [Notistack](https://iamhosseindhv.com/notistack) – Notificaciones
- PWA (Progressive Web App) – Instalación en dispositivos móviles

---

## ✨ Funcionalidades principales (MVP)

### 1. Autenticación y sesión

- Registro de comercio (sign up).
- Inicio de sesión (login).
- Redirección a la configuración después del registro.

### 2. Configuración del comercio

- Teléfono de contacto.
- Dirección.
- Métodos de pago aceptados (Yape, Plin, Efectivo, etc.).
- Subida de imágenes QR (Yape y Plin) para que los clientes puedan pagar escaneando.

### 3. Gestión de Cobros (**Charges**)

- Creación de nuevos cobros.
- Edición y eliminación de cobros.
- Selección del método de pago según lo configurado por el comercio.
- Listado con filtros básicos y exportación.

### 4. Solicitudes de pago (**Payment Requests**)

- Creación de solicitudes de pago con:
  - Cliente, monto, método de pago, descripción, fecha de expiración.
- Visualización del detalle de la solicitud.
- Envío/compartir link público para el cliente.
- Cancelación de solicitudes de pago.

### 5. Flujo público de pago

- Página pública `/mark-paid/:token` donde el cliente:
  - Ve los datos de la solicitud.
  - Puede escanear el QR de Yape/Plin o copiar el número de celular del comercio.
  - Marca **“Ya realicé el pago”**.
- El comercio luego revisa y **marca como pagada** la solicitud → se genera automáticamente un **Charge** asociado.

### 6. Dashboard / Resumen

- Gráficas y estadísticas simples:
  - Cantidad de charges.
  - Cantidad de payment requests.
  - Ventas totales por método de pago.
- Vista rápida del estado del negocio.

---

## ⚙️ Configuración del proyecto

### Requisitos previos

- Node.js (versión recomendada: 18+)
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPO>
cd controlwallet-frontend

# Instalar dependencias
npm install
# o
pnpm install
