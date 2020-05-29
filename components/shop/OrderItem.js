import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../UI/Card";

const OrderItem = ({ amount, date, items }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button
                title={showDetails ? "Hide Details" : "Show Details"}
                color={Colors.primary}
                onPress={() => {
                    setShowDetails((prevState) => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {items.map((cartItem) => {
                        const {
                            productId,
                            quantity,
                            productTitle,
                            sum,
                        } = cartItem;
                        return (
                            <CartItem
                                key={productId}
                                quantity={quantity}
                                title={productTitle}
                                amount={sum}
                            />
                        );
                    })}
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: "center",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontFamily: "open-sans",
        color: "#888",
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;
