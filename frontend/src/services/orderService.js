import { placeOrder, getOrderHistory } from './api';

// Order management service
export class OrderService {
  
  // Place a new order
  static async placeNewOrder(medicineIds) {
    try {
      if (!medicineIds || !Array.isArray(medicineIds) || medicineIds.length === 0) {
        throw new Error('Please select at least one medicine to place an order');
      }

      // Validate medicine IDs
      const validIds = medicineIds.filter(id => Number.isInteger(id) && id > 0);
      if (validIds.length !== medicineIds.length) {
        throw new Error('Invalid medicine IDs provided');
      }

      const response = await placeOrder(validIds);
      return {
        success: true,
        orderId: response.orderId,
        totalAmount: response.totalAmount,
        message: response.message
      };
    } catch (error) {
      console.error('Error placing order:', error);
      throw new Error(error.message || 'Failed to place order. Please try again.');
    }
  }

  // Get order history for the current user
  static async getOrderHistoryData() {
    try {
      const orders = await getOrderHistory();
      return orders.map(order => this.formatOrderData(order));
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw new Error('Failed to fetch order history. Please try again.');
    }
  }

  // Format order data for display
  static formatOrderData(order) {
    return {
      id: order.id,
      totalAmount: order.totalAmount,
      status: order.status,
      orderTime: order.orderTime,
      user: order.user,
      medicines: order.genericMedicines || [],
      medicineCount: (order.genericMedicines || []).length,
      formattedOrderTime: order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'
    };
  }

  // Calculate order statistics
  static calculateOrderStats(orders) {
    if (!orders || orders.length === 0) {
      return {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        statusCounts: {}
      };
    }

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = totalSpent / totalOrders;

    const statusCounts = orders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {});

    return {
      totalOrders,
      totalSpent: Math.round(totalSpent * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      statusCounts
    };
  }

  // Filter orders by status
  static filterOrdersByStatus(orders, status) {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  }

  // Filter orders by date range
  static filterOrdersByDateRange(orders, startDate, endDate) {
    if (!startDate || !endDate) return orders;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return orders.filter(order => {
      if (!order.orderTime) return false;
      const orderDate = new Date(order.orderTime);
      return orderDate >= start && orderDate <= end;
    });
  }

  // Sort orders by date (newest first)
  static sortOrdersByDate(orders, ascending = false) {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.orderTime || 0);
      const dateB = new Date(b.orderTime || 0);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }

  // Get order status color for UI
  static getStatusColor(status) {
    const statusColors = {
      'PLACED': 'primary',
      'CONFIRMED': 'info',
      'SHIPPED': 'warning',
      'DELIVERED': 'success',
      'CANCELLED': 'danger',
      'PENDING': 'secondary'
    };
    return statusColors[status] || 'secondary';
  }

  // Get order status badge text
  static getStatusBadgeText(status) {
    const statusTexts = {
      'PLACED': 'Order Placed',
      'CONFIRMED': 'Confirmed',
      'SHIPPED': 'Shipped',
      'DELIVERED': 'Delivered',
      'CANCELLED': 'Cancelled',
      'PENDING': 'Pending'
    };
    return statusTexts[status] || status;
  }

  // Validate order data before submission
  static validateOrderData(medicineIds) {
    if (!medicineIds) {
      throw new Error('Medicine IDs are required');
    }

    if (!Array.isArray(medicineIds)) {
      throw new Error('Medicine IDs must be an array');
    }

    if (medicineIds.length === 0) {
      throw new Error('Please select at least one medicine');
    }

    const invalidIds = medicineIds.filter(id => !Number.isInteger(id) || id <= 0);
    if (invalidIds.length > 0) {
      throw new Error('Invalid medicine IDs found');
    }

    return true;
  }

  // Generate order summary
  static generateOrderSummary(medicines) {
    const totalAmount = medicines.reduce((sum, medicine) => sum + medicine.finalPrice, 0);
    const totalMRP = medicines.reduce((sum, medicine) => sum + medicine.mrp, 0);
    const totalSavings = totalMRP - totalAmount;
    const savingsPercentage = totalMRP > 0 ? Math.round((totalSavings / totalMRP) * 100) : 0;

    return {
      medicineCount: medicines.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalMRP: Math.round(totalMRP * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      savingsPercentage
    };
  }
}

export default OrderService;
