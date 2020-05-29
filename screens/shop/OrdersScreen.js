import React from "react";
import { View, FlatList, Text, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
    const orders = useSelector((state) => state.orders.orders);
    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
                const { totalAmount, readableDate, items } = itemData.item;
                return (
                    <OrderItem
                        items={items}
                        amount={totalAmount}
                        date={readableDate}
                    />
                );
            }}
        />
    );
};

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Your Orders",
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
    };
};

export default OrdersScreen;
