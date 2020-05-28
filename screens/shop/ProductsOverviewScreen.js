import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.availableProducts);
    return (
        <FlatList
            data={products}
            renderItem={(itemData) => {
                const { id, imageUrl, title, price } = itemData.item;
                return (
                    <ProductItem
                        image={imageUrl}
                        title={title}
                        price={price}
                        onViewDetail={() => {
                            navigation.navigate("ProductDetail", {
                                productId: id,
                                productTitle: title
                            });
                        }}
                        onAddToCart={() => {}}
                    />
                );
            }}
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: "All Products",
};

const styles = StyleSheet.create({
    screen: {},
});

export default ProductsOverviewScreen;
