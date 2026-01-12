export {};

declare global {
  interface Window {
    testHelpers: {
      addCoins: (amount: number) => void;
      giveItem: (itemId: number, quantity: number) => void;
      
    };
  }
}