import { searchBrandedMedicine, searchGenericMedicine } from './api';

// Medicine search service with enhanced functionality
export class MedicineService {
  
  // Search for branded medicines with generics
  static async searchBranded(keyword) {
    try {
      if (!keyword || keyword.trim() === '') {
        return [];
      }
      
      const results = await searchBrandedMedicine(keyword.trim());
      return results || [];
    } catch (error) {
      console.error('Error searching branded medicines:', error);
      throw new Error('Failed to search medicines. Please try again.');
    }
  }

  // Search for generic medicines only
  static async searchGeneric(keyword) {
    try {
      if (!keyword || keyword.trim() === '') {
        return [];
      }
      
      const results = await searchGenericMedicine(keyword.trim());
      return results || [];
    } catch (error) {
      console.error('Error searching generic medicines:', error);
      throw new Error('Failed to search generic medicines. Please try again.');
    }
  }

  // Format medicine data for display
  static formatMedicineData(medicine) {
    return {
      id: medicine.id,
      name: medicine.brandedName || medicine.name,
      ingredient: medicine.ingredient,
      dosage: medicine.dosage,
      manufacturer: medicine.manufacturer,
      mrp: medicine.mrp,
      finalPrice: medicine.finalPrice,
      form: medicine.form,
      savings: medicine.mrp - medicine.finalPrice,
      savingsPercentage: Math.round(((medicine.mrp - medicine.finalPrice) / medicine.mrp) * 100),
      generics: medicine.generics || []
    };
  }

  // Calculate total savings for multiple medicines
  static calculateTotalSavings(medicines) {
    return medicines.reduce((total, medicine) => {
      return total + (medicine.mrp - medicine.finalPrice);
    }, 0);
  }

  // Sort medicines by price (ascending)
  static sortByPrice(medicines, ascending = true) {
    return [...medicines].sort((a, b) => {
      return ascending ? a.finalPrice - b.finalPrice : b.finalPrice - a.finalPrice;
    });
  }

  // Sort medicines by savings (descending)
  static sortBySavings(medicines) {
    return [...medicines].sort((a, b) => {
      const savingsA = a.mrp - a.finalPrice;
      const savingsB = b.mrp - b.finalPrice;
      return savingsB - savingsA;
    });
  }

  // Filter medicines by price range
  static filterByPriceRange(medicines, minPrice, maxPrice) {
    return medicines.filter(medicine => {
      return medicine.finalPrice >= minPrice && medicine.finalPrice <= maxPrice;
    });
  }

  // Filter medicines by manufacturer
  static filterByManufacturer(medicines, manufacturer) {
    if (!manufacturer) return medicines;
    return medicines.filter(medicine => 
      medicine.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
    );
  }

  // Get unique manufacturers from medicine list
  static getUniqueManufacturers(medicines) {
    const manufacturers = medicines.map(medicine => medicine.manufacturer);
    return [...new Set(manufacturers)].sort();
  }

  // Validate medicine data
  static validateMedicineData(medicine) {
    const requiredFields = ['name', 'ingredient', 'dosage', 'manufacturer', 'mrp', 'finalPrice', 'form'];
    const missingFields = requiredFields.filter(field => !medicine[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (medicine.mrp < 0 || medicine.finalPrice < 0) {
      throw new Error('Price values must be positive');
    }

    if (medicine.finalPrice > medicine.mrp) {
      throw new Error('Final price cannot be greater than MRP');
    }

    return true;
  }

  // Generate medicine comparison data
  static generateComparisonData(brandedMedicine) {
    if (!brandedMedicine.generics || brandedMedicine.generics.length === 0) {
      return {
        branded: brandedMedicine,
        generics: [],
        totalSavings: 0,
        averageSavings: 0
      };
    }

    const generics = brandedMedicine.generics.map(gen => this.formatMedicineData(gen));
    const totalSavings = this.calculateTotalSavings(generics);
    const averageSavings = totalSavings / generics.length;

    return {
      branded: this.formatMedicineData(brandedMedicine),
      generics: generics,
      totalSavings,
      averageSavings: Math.round(averageSavings * 100) / 100
    };
  }
}

export default MedicineService;
