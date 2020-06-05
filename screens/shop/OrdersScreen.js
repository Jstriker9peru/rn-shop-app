import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector((state) => state.orders.orders);

    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    if (orders.length === 0) {
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>No orders found, maybe start ordering some products?</Text>
        </View>;
    }
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;
