import React from "react";
import {
    FlatList,
    StyleSheet,
    Platform,
    Button,
    Alert,
    View,
    Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
    const userProducts = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        navigation.navigate("EditProduct", { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert(
            "Are you sure?",
            "Do you really want to delete this item?",
            [
                { text: "No", style: "default" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        dispatch(productsActions.deleteProduct(id));
                    },
                },
            ]
        );
    };

    if (userProducts.length === 0) {
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>No products found, maybe start creating some?</Text>
        </View>;
    }
    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
                const { id, imageUrl, title, price } = itemData.item;
                return (
                    <ProductItem
                        image={imageUrl}
                        title={title}
                        price={price}
                        onSelect={() => editProductHandler(id)}
                    >
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => editProductHandler(id)}
                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => deleteHandler(id)}
                        />
                    </ProductItem>
                );
            }}
        />
    );
};

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Your Products",
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
                    title="Add"
                    iconName={
                        Platform.OS === "android" ? "md-create" : "ios-create"
                    }
                    onPress={() => {
                        navData.navigation.navigate("EditProduct");
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
