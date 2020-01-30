import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import Utilities from '../../utils/Utilities';

let days = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ',
    'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];

class ItemDate extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dataIndex != nextProps.indexSelected
            && this.props.dataIndex != this.props.indexSelected) {
            return false
        }

        return true
    }

    render() {
        var item = this.props.dataItem
        var selected = this.props.indexSelected == this.props.dataIndex ? true : false
        var colorSeleted = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)'
        return (
            <TouchableOpacity style={{
                height: 80,
                width: 80,
                marginEnd: 15,
                borderRadius: 2,
                borderWidth: selected ? 2 : 1,
                borderColor: colorSeleted,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => this.props.onSelectDate()}
            >
                <Text style={{
                    fontSize: selected ? 13 : 11,
                    color: colorSeleted
                }}>{days[item.getDay()]}</Text>
                <Text style={{
                    fontSize: selected ? 24 : 22,
                    color: colorSeleted,
                    fontWeight: '500'
                }}>{item.getDate()}</Text>
                <Text style={{
                    fontSize: selected ? 13 : 11,
                    color: colorSeleted
                }}>THÁNG {item.getMonth() + 1}</Text>
            </TouchableOpacity>
        )
    }
}

export default class CalenderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listNext15days: [],
            indexSelected: 1
        }
    }

    componentDidMount() {
        var day = new Date()

        var listNext15days = [day]

        for (let index = 1; index <= 10; index++) {
            var nextDay = new Date(day);
            nextDay.setDate(day.getDate() + index);
            listNext15days.push(nextDay)
        }

        this.setState({
            listNext15days
        })
    }

    render() {
        return (
            <View style={{
                paddingHorizontal: 16,
                paddingTop: 20,
                borderTopWidth: 0.5,
                borderColor: 'rgba(0,0,0,0.3)'
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'rgba(0,0,0,0.8)',
                    marginBottom: 16
                }}>ĐẶT LỊCH HẸN</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.listNext15days}
                    extraData={this.state.indexSelected}
                    keyExtractor={(index) => index}
                    renderItem={({ index, item }) =>
                        <ItemDate
                            dataItem={item}
                            dataIndex={index}
                            indexSelected={this.state.indexSelected}
                            onSelectDate={() => this.setState({ indexSelected: index })} />
                    }
                />

                <TouchableOpacity
                    style={{
                        marginTop: 30,
                        height: 45,
                        borderRadius: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        shadowColor: 'rgba(0,0,0,0.8)',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 6,
                        shadowOpacity: 0.5,
                        elevation: 2
                    }}
                    onPress={() => alert("Comming soon")}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>ĐẶT LỊCH</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({})
