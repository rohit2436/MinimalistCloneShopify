import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../shopifyApi/shopifyClient";

// Shopify Types
interface LineItem {
  variantId: string;
  quantity: number;
}

interface CustomAttribute {
  key: string;
  value: string;
}

interface ShippingAddress {
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip: string;
  country: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// **Products**
export const fetchAllProducts = async (): Promise<any> => {
  try {
    return await client.product.fetchAll();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const fetchProductById = async (productId: string): Promise<any> => {
  try {
    const product = await client.product.fetch(productId);
    console.log("Product Variants:", product.variants);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// **Collections**
export const fetchAllCollections = async (): Promise<any> => {
  try {
    return await client.collection.fetchAll();
  } catch (error) {
    console.error("Error fetching all collections:", error);
    throw error;
  }
};

export const fetchCollectionById = async (collectionId: string): Promise<any> => {
  try {
    return await client.collection.fetchWithProducts(collectionId);
  } catch (error) {
    console.error("Error fetching collection by ID:", error);
    throw error;
  }
};

// **Checkout**
export const createCheckout = async (): Promise<any> => {
  try {
    const checkout = await client.checkout.create();
    try {
      await AsyncStorage.setItem('checkoutId', checkout.id);
    } catch (storageError) {
      console.error("Error saving checkout ID to AsyncStorage:", storageError);
    }
    return checkout;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
};

export const getCheckout = async (): Promise<any> => {
  try {
    const checkoutId: string | null = await AsyncStorage.getItem('checkoutId');
    if (checkoutId && checkoutId.trim()) {
      return await client.checkout.fetch(checkoutId);
    }
    return createCheckout();
  } catch (error) {
    console.error("Error fetching checkout:", error);
    throw error;
  }
};

export const updateCheckoutAttributes = async (attributes: CustomAttribute[]): Promise<any> => {
  try {
    const checkoutId: string | null = await AsyncStorage.getItem('checkoutId');
    if (checkoutId) {
      return await client.checkout.updateAttributes(checkoutId, { customAttributes: attributes });
    } else {
      throw new Error("No checkout ID found in storage.");
    }
  } catch (error) {
    console.error("Error updating checkout attributes:", error);
    throw error;
  }
};

// **Line Items**
export const addLineItemsToCheckout = async (lineItems: LineItem[]): Promise<any> => {
  try {
    const checkout = await getCheckout();

    // Validate line items
    lineItems.forEach(item => {
      if (!item.variantId.startsWith("gid://")) {
        console.error("Invalid variant ID format:", item.variantId);
        throw new Error("Invalid variant ID format.");
      }
    });

    return await client.checkout.addLineItems(checkout.id, lineItems);
  } catch (error) {
    console.error("Error adding line items to checkout:", error);
    throw error;
  }
};

export const updateLineItemsInCheckout = async (lineItems: LineItem[]): Promise<any> => {
  try {
    const checkout = await getCheckout();
    return await client.checkout.updateLineItems(checkout.id, lineItems);
  } catch (error) {
    console.error("Error updating line items in checkout:", error);
    throw error;
  }
};

export const removeLineItemsFromCheckout = async (lineItemIds: string[]): Promise<any> => {
  try {
    const checkout = await getCheckout();
    return await client.checkout.removeLineItems(checkout.id, lineItemIds);
  } catch (error) {
    console.error("Error removing line items from checkout:", error);
    throw error;
  }
};

// **Discounts**
export const addDiscountToCheckout = async (discountCode: string): Promise<any> => {
  try {
    const checkout = await getCheckout();
    return await client.checkout.addDiscount(checkout.id, discountCode);
  } catch (error) {
    console.error("Error adding discount to checkout:", error);
    throw error;
  }
};

export const removeDiscountFromCheckout = async (): Promise<any> => {
  try {
    const checkout = await getCheckout();
    return await client.checkout.removeDiscount(checkout.id);
  } catch (error) {
    console.error("Error removing discount from checkout:", error);
    throw error;
  }
};

// **Shipping Address**
export const updateShippingAddressInCheckout = async (shippingAddress: ShippingAddress): Promise<any> => {
  try {
    const checkout = await getCheckout();
    return await client.checkout.updateShippingAddress(checkout.id, shippingAddress);
  } catch (error) {
    console.error("Error updating shipping address in checkout:", error);
    throw error;
  }
};
