# ระบบ Smart Café: ระบบสั่งซื้อและรับสินค้าสำหรับคาเฟ่สมัยใหม่

Smart Café คือระบบสั่งซื้อสินค้าและรับสินค้าสำหรับคาเฟ่ที่ทันสมัย สร้างด้วย Next.js, TypeScript และ Tailwind CSS ระบบนี้ช่วยให้ลูกค้าสามารถดูเมนู, สั่งซื้อสินค้า, และติดตามสถานะคำสั่งซื้อได้อย่างง่ายดาย ในขณะเดียวกันก็มีแดชบอร์ดที่มีประสิทธิภาพสำหรับบาริสต้าเพื่อจัดการคำสั่งซื้อต่าง ๆ

## Features

### Customer Features

- Browse menu of coffee and beverage items
- View item details, prices, and images
- Place orders with order confirmation
- Track order status with Order ID
- QR code generation for order pickup

### Barista Features

- Dashboard with order queue management
- Mark orders as "Ready"
- Order statistics and analytics
- Professional interface optimized for workflow

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons, Primereact
- **Backend**: Express.js, Typescript
- **Validation**: Zod
- **Authentication**: JWT (jsonwebtoken)
- **Database**: MySQL

# API Endpoints

### Authentication

- `POST /api/auth/user/login` - Login user
  - Body: `{username: string, password: string}`
  - Response: `{username: string, role: Role, password: string}`
- `POST /api/auth/barista/login` - Login user
  - Body: `{username: string, password: string}`
  - Response: `{username: string, role: Role, password: string}`
- `GET /api/auth/user/me`
  - Response: `{username: string, role: Role, password: string}`

### Menu

- `GET /api/menu` - Get all menu items
  - Response: Array of menu items with prices and details
- `GET /api/menu/:id` - Get menu by id
  - Response: menu item with toppings

### Orders

- `POST /api/order` - Create new order

  - Body: `{ items: array, total_price: number}`
  - Response: order with orderItems

- `GET /api/order` - Get all orders (for barista dashboard)

  - Response: Today orders with orderItems

- `GET /api/order/[id]` - Get specific order details

  - Response: Complete order information with status

- `PATCH /api/order/[id]` - Update order status
  - Body: `{ status: string }`
  - Response: order with orderItems

## Getting Started

### Prerequisites

- Node.js 22
- pnpm

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd smart-cafe-web
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
    # Create .env.local file
    NEXT_PUBLIC_API_BASE_URL=your-backend-url-here
    NEXT_PUBLIC_FRONTEND_URL=your-frontend-url-here
   ```

````

4. Run the development server
   ```bash
   pnpm dev
````

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage

### For Customers

1. Visit the homepage to browse the menu
2. login to order menu
3. Click "Add to Order" on desired items
4. Complete the order process
5. Use "Track Order" to monitor order status
6. Show QR code at pickup

### For Baristas

1. Login to access the barista dashboard
2. View incoming orders in the queue
3. Mark orders as "Ready" when prepared
4. Monitor order statistics

### Demo Credentials

- Username: `barista`, Password: `cafe123` (Barista role)
- Username: `admin`, Password: `admin123` (Admin role)

## Project Structure

```
smart-cafe/
├── app/
│ └── (employee)
│       └── barista/
│ └── (main)
│       └── cart/
│       └── login/
│       └── menu/
│       └── track/
│       └── page.tsx
├── components/
├── enum/
├── hook/
├── libs/
├── components/
├── public/
└── README.md
```

## Design System

The application uses a warm, café-inspired design with:

- **Primary Color**: Emerald green (#059669)
- **Typography**: Poppins for headings, system fonts for body
- **Layout**: Desktop Design

## Future Enhancements

- Real-time order updates with WebSockets
- Payment integration
- Email/SMS notifications
- Advanced analytics dashboard
- Multi-location support
- Inventory management
- Order history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for demonstration purposes as part of a coding challenge.
