import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Platform,
    ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const loadProuducts = useCallback(async () => {
        setIsRefreshing(true);
        setError(null);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);

    }, [dispatch, setIsRefreshing, setError]);

    useEffect(() => {
        const willFocusSub = navigation.addListener("willFocus", loadProuducts);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProuducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProuducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProuducts]);

    const selectItemHandler = (id, title) => {
        navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title,
        });
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error Occured!</Text>
                <Button
                    title="Try Again"
                    onPress={loadProuducts}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadProuducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={(itemData) => {
                const { id, imageUrl, title, price } = itemData.item;
                return (
                    <ProductItem
                        image={imageUrl}
                        title={title}
                        price={price}
                        onSelect={() => {
                            selectItemHandler(id, title);
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="View Details"
                            onPress={() => {
                                selectItemHandler(id, title);
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="To Cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }}
                        />
                    </ProductItem>
                );
            }}
        />
    );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "All Products",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={
                        Platform.OS === "android" ? "md-cart" : "ios-cart"
                    }
                    onPress={() => {
                        navData.navigation.navigate("Cart");
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProductsOverviewScreen;
