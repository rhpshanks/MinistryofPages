import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';

export default function History() {
  const mockOrders = [
    {
      id: 'ORD-2026-8943',
      date: 'June 18, 2026',
      status: 'Delivered',
      total: 45.00,
      items: [
        { product: MOCK_PRODUCTS[0], quantity: 2 },
        { product: MOCK_PRODUCTS[1], quantity: 1 }
      ]
    },
    {
      id: 'ORD-2026-6421',
      date: 'May 10, 2026',
      status: 'In Transit',
      total: 12.50,
      items: [
        { product: MOCK_PRODUCTS[2], quantity: 1 }
      ]
    },
    {
      id: 'ORD-2025-1082',
      date: 'December 05, 2025',
      status: 'Delivered',
      total: 78.00,
      items: [
        { product: MOCK_PRODUCTS[3], quantity: 3 },
        { product: MOCK_PRODUCTS[4], quantity: 2 }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 py-16 sm:py-24 min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif mb-8">Order History</h1>
          
          <div className="space-y-8">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-4 py-4 sm:px-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium">Order Number</p>
                      <p className="text-slate-900 mt-1">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Date Placed</p>
                      <p className="text-slate-900 mt-1">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Total Amount</p>
                      <p className="text-slate-900 mt-1">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {order.status === 'Delivered' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {order.status === 'In Transit' && <Truck className="h-5 w-5 text-amber-500" />}
                    {order.status === 'Processing' && <Clock className="h-5 w-5 text-blue-500" />}
                    <span className="font-medium text-slate-900 text-sm">{order.status}</span>
                  </div>
                </div>
                
                <div className="px-4 py-6 sm:px-6">
                  <ul role="list" className="space-y-6">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-slate-200 bg-slate-100 flex items-center justify-center relative group">
                           {item.product.id === 'p1' && <Package className="w-10 h-10 text-slate-400 group-hover:text-slate-600 transition-colors" />}
                           {item.product.id === 'p2' && <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 rotate-12 transition-transform group-hover:rotate-6"></div>}
                           {item.product.id === 'p3' && <div className="w-12 h-16 bg-[#F5F5DC] shadow-sm border border-slate-200 -rotate-6 transition-transform group-hover:rotate-0"></div>}
                           {item.product.id === 'p4' && <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:4px_4px]"></div></div>}
                           {item.product.id === 'p5' && <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 opacity-90 backdrop-blur-sm"></div>}
                           {!['p1', 'p2', 'p3', 'p4', 'p5'].includes(item.product.id) && <Package className="w-10 h-10 text-slate-400 group-hover:text-slate-600 transition-colors" />}
                        </div>
                        
                        <div className="flex flex-1 flex-col justify-center">
                          <div className="flex justify-between">
                            <h4 className="text-base font-medium text-slate-900 font-serif">{item.product.name}</h4>
                            <p className="ml-4 text-sm font-medium text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">SKU: {item.product.sku}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                            <button className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors">
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
