import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
	{
		id: "Uber-X-123",
		title: "UberX",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL-456",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https://links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX-789",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	const SURGE_CHARGE_RATE = 1.5;

	return (
		<SafeAreaView style={tw`flex-grow bg-white`}>
			<View>
				<TouchableOpacity
					style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
					onPress={() => navigation.navigate("NavigateCard")}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					Select a Ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex-row items-center justify-between px-10 ${
							item.id === selected?.id && "bg-gray-200"
						}`}
					>
						<Image
							style={{
								width: 100,
								height: 100,
								resizeMode: "contain",
							}}
							source={{
								uri: item.image,
							}}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{item.title}</Text>
							<Text style={tw`text-xs`}>
								{travelTimeInformation?.duration?.text} Travel Time
							</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat("en", {
								style: "currency",
								currency: "USD",
							}).format(
								(travelTimeInformation?.duration?.value *
									SURGE_CHARGE_RATE *
									item.multiplier) /
									100
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View>
				<TouchableOpacity
					style={tw`bg-black py-3 pb-5 ${!selected && "bg-gray-300"}`}
					disabled={!selected}
				>
					<Text style={tw`text-center text-white text-xl`}>
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
