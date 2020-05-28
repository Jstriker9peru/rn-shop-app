import React from "react";
import {
    View,
    Text,
    Image,
    Button,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const ProductDetailScreen = ({ navigation }) => {
    const productId = navigation.getParam("productId");
    const selectedProduct = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === productId)
    );

    const { imageUrl, price, description } = selectedProduct;
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
            </View>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;
