# QR Code Generator

This project is a React web application for generating QR codes (in SVG format) from user input. Users can customize the appearance of QR codes, including foreground and background colors, error correction levels, width, and margin. The application also allows users to download all generated QR codes as a ZIP file.

![image](https://github.com/penguinff/readme_pictures/blob/main/qrcode-generator/homepage.png)

## Table of Contents

- [Features](#features)
- [Technologies & Dependencies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Input Handling**: Users can input multiple strings (maximum 200) separated by a specified separator. (Default separated by a new line, unless specified otherwise)
- **Customization**: Users can customize the foreground color, background color, error correction level, width, and margin of the QR codes.
- **QR Code Generation**: Generates QR codes in SVG format.
- **Single Download**: Users can download individual QR code.
- **Bulk Download**: Download all generated QR codes in a single ZIP file, with a CSV file mapping the filename and content.
- **Responsive Design**: The application is fully responsive and supports mobile view for an optimal user experience on all devices.

## Technologies & Dependencies

- **React**: a library for building user interfaces.
- **TypeScript**: a strongly typed programming language that builds on JavaScript.
- **Vite**: a fast build tool and development server for modern web projects.
- **Sass**: a preprocessor scripting language that is interpreted or compiled into CSS.
- **QRCode**: a library for generating QR codes.
- **JSZip**: a library for creating, reading, and editing .zip files.
- **file-saver**: a library to save files on the client-side.
- **react-colorful**: a tiny and fast color picker component for React.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/penguinff/qrcode-generator.git
   cd qrcode-generator
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

## Usage

1. **Input Data**:

   - Enter the strings (maximum 200) to be converted into QR codes in the input field.
   - Specify the separator used to split the input strings. (Default separated by a new line, unless specified otherwise)

2. **Customize QR Code**:

   - Set the foreground and background colors.
   - Choose the error correction level (Low, Medium, Quartile, High).
   - Specify the width and margin of the QR codes.

3. **Generate QR Codes**:

   - Click the "Generate QR Codes" button to create the QR codes.
   - The generated QR codes will be displayed in a list.
   - Click the QR code to download SVG file individually.

4. **Download QR Codes**:

   - Click the "Download all in .zip file" button to download a ZIP file containing all generated QR codes in SVG format with a CSV file mapping the filename and content.

5. **Reset**:
   - Click the "Reset" button to clear all input fields and generated QR codes.
