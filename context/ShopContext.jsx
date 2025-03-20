import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // ✅ State should be inside the function
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem,setCartItem]=useState({});
    const navigate = useNavigate();


    const addToCart = async (itemId,size)=>{
            if (!size) {
                toast.error('Select Product Size')
                return;
            }
            let cartData = structuredClone(cartItem)
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size]+= 1;
                }
                else{
                    cartData[itemId][size] = 1;
                }
            }else{
                cartData[itemId]={};
                cartData[itemId][size]=1;
            }
            setCartItem(cartData)
    }

    const getCartCount = () => {
        let totalcount =0 ;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalcount += cartItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalcount;
    }
    const upadateQuantity=async(itemId,size,quantity)=>{
           let cartData=structuredClone(cartItem);

           cartData[itemId][size]=quantity;
           setCartItem(cartData);
    }

    const getCartAmount = () =>{
         let totalAmount = 0;
         for(const items in cartItem){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                         totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
         }
         return totalAmount;
    }

    const currency = '$';
    const delivery_fee = 20;

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,addToCart,cartItem,
        getCartCount,upadateQuantity,
        getCartAmount,navigate
    }



    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
