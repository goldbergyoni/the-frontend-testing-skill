import { httpService } from "@/lib/http";
import { Logger } from "@/lib/logger";

interface IRemoveFromCartValues {
  cartId: number;
  productId: number;
}

export const removeFromCart = async (body: IRemoveFromCartValues) => {
  try {
    await httpService.delete(`carts/${body.cartId}/products/${body.productId}`);
  } catch (e) {
    Logger.error(
      "An error occurred during removing an item from the cart",
      e as Error
    );
  }
};
