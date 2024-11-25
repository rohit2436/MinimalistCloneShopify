import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import SelectCountryScreen from './Filter';
import Customer from './Customer';
import Footer from './Footer';
import BestSellers from './BestSellers';





const ShopNow = () => {

  const [review, setReview] = useState(4);
  const options = ["Fragrance Free", " Sulfates Free", "Parabens Free", "Silicones Free", " Dyes Free", " Essential Oils Free"];
  const [number, setNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [ideal, setIdeal] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);



  return (
    <ScrollView>
      <Modal visible={modalVisible} transparent={true}>
        <View style={{justifyContent:"center", alignItems:"center",top:"35%"}}>
        <View style={{justifyContent:"center", alignItems:"center", borderWidth:1, height:150,width:250, elevation:10,backgroundColor:"white",borderRadius:20}}>
          <Text style={{padding:20}}>This is Static Page</Text>
          <Button title='Close' color={"black"} onPress={()=>setModalVisible(false)}/>
        </View>
        </View>

      </Modal>
      <View>

        <Image style={{ height: 500, width: "100%" }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
        <View style={{ flexDirection: "row" }}>
          <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
          <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
        </View>

        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: 500 }}>Retinal 0.1% Face Serum</Text>
          <View style={{ alignItems: "center", flexDirection: "row", alignItems: "flex-start", paddingTop: 20, paddingBottom: 20 }}>
            <AirbnbRating
              size={18}
              showRating={false}
              selectedColor='black'
              defaultRating={review}
              isDisabled={true}
            />
            <Text style={{ fontWeight: 500, fontSize: 15, marginLeft: 10 }}>{review} Reviews</Text>
          </View>

          <Text style={{ fontWeight: 500, fontSize: 15 }}>Mid-Strength Retinal to visibly reduce signs of aging</Text>
          <Text style={{ paddingTop: 20, paddingBottom: 20 }}>A lightweight anti-aging serum formulated with Retinal, Oleyl Adapalenate, Bakuchiol, and Squalane to combat the visible signs of aging. Retinal, one of the most efficacious form of Vitamin-A, helps fight fine line, wrinkles, and uneven skin tone while improving elasticity and texture. By encouraging cell turnover, this serum promotes a more youthful, radiant complexion.</Text>



          <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginBottom: 20 }}>

            {
              options.map((option) => (
                <View style={{ flexDirection: "row", width: "50%" }}>
                  <View style={{ paddingRight: 10, flexDirection: "row", flex: 1 }}>
                    <Icon name="check" size={30} color="black" />
                    <Text style={{ marginLeft: 10, fontSize: 15 }}>{option}</Text>
                  </View>
                </View>
              )
              )
            }
          </View>


          <View style={{ borderWidth: .5, height: 50, width: 370, padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>MRP 750 /-</Text>
          </View>



          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <View style={{ borderWidth: .5, height: 35, width: "40%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <TouchableOpacity onPress={() => number > 0 ? setNumber(number - 1) : null}>
                <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="minus" size={20} color="black" /></View>
              </TouchableOpacity>

              <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>{number}</Text>
              <TouchableOpacity onPress={() => setNumber(number + 1)}>
                <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="plus" size={20} color="black" /></View>
              </TouchableOpacity>


            </View>
            <View style={{ flex: 1, height: 50, marginLeft: 20, marginRight: 10 }}><Button title='Add to Cart' color={"black"} /></View>

          </View>


          <View style={{ marginTop: 20, justifyContent: "space-between", flexDirection: "row", marginRight: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>What Makes It Potent?</Text>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <View style={{ marginRight: 20 }}><Icon name={"plus"} size={20} /></View>
            </TouchableOpacity>
          </View>
          {visible ?
            <Text style={{ fontSize: 15, padding: 10 }}> • Retinal (0.1%): A powerful yet gentle form of Vitamin A, It is known for its superior efficacy in reducing fine lines, wrinkles, and uneven skin tone. It promotes cell turnover, revealing a more youthful, radiant complexion. As per a clinical study it improves photoaging by 95%. </Text>
            : null
          }


          <View style={{ marginTop: 20, justifyContent: "space-between", flexDirection: "row", marginRight: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>Ideal For</Text>
            <TouchableOpacity onPress={() => setIdeal(!ideal)}>
              <View style={{ marginRight: 20 }}><Icon name={"plus"} size={20} /></View>
            </TouchableOpacity>
          </View>
          {ideal ?
            <Text style={{ fontSize: 15, padding: 10 }}> • Retinal (0.1%): A powerful yet gentle form of Vitamin A, It is known for its superior efficacy in reducing fine lines, wrinkles, and uneven skin tone. It promotes cell turnover, revealing a more youthful, radiant complexion. As per a clinical study it improves photoaging by 95%. </Text>
            : null
          }




<Text style={{ textAlign: "left", fontWeight: 500, fontSize: 20, paddingLeft: 20 ,marginTop:50}}>Recommended Products</Text>
<BestSellers />




          <View style={{ padding: 10, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: 500, textAlign: "center", marginBottom: 20 }}>Customer Review</Text>
            <View style={{ flexDirection: "row", }}>
              <Text style={{ fontSize: 60, fontWeight: 700, marginRight: 10 }}>{review}</Text>

              <View style={{ justifyContent: "flex-start", alignItems: "flex-start", }}>
                <View style={{ marginTop: 10 }}><AirbnbRating
                  size={18}
                  showRating={false}
                  selectedColor='black'
                  defaultRating={review}
                  isDisabled={true}
                />
                  <Text style={{ fontSize: 15, textAlign: "left", marginTop: 5 }}>Based on 24 Review</Text></View>

              </View>

            </View>


            {/* //making 5star and bar */}
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>5</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.3} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>17</Text>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>4</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.1} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>3</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>00</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>2</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.1} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>1</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.2} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ margin: 25, width: 150, }}>
              <Button title='Write A Review' color={"black"} />
            </View>

            <View style={{ borderWidth: .5, height: 1, width: 300, borderColor: "grey", margin: 30 }} />


            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ borderWidth: 1, height: 40, width: "60%", borderRadius: 20, justifyContent: "center", alignItems: "center", marginRight: 10, marginLeft: 20 }}>
                <View style={{ flexDirection: "row" }} >
                  <View style={{ marginRight: 0, padding: 5, marginLeft: 5 }}><Icon name="search" size={20} /></View>
                  <TextInput placeholder='Search reviews' style={{ flex: 1 }} />
                </View>
              </View>

              <View style={{ borderWidth: 1, height: 40, width: "30%", borderRadius: 20, justifyContent: "center", alignItems: "center", marginRight: 10, marginLeft: 20 }}>
                <View style={{ flexDirection: "row" }} >
                  <View style={{ marginLeft: 10, marginRight: 1 }}><Icon name="filter" size={20} /></View>

                  <Text style={{ flex: 1, textAlign: "center" }}>Filter</Text>
                </View>
              </View>

            </View>

            <View style={{ justifyContent: "center", alignItems: "center", borderRadius: 30, height: 30, flexDirection: "row", marginTop: 30 }}>
              <Text style={{ textAlign: "center", textAlignVertical: "center" }}>Sort by:  </Text>
              <SelectCountryScreen />

            </View>

            <View style={{marginTop:20}}>
            <Customer/>
            </View>
            

         







          </View>
         
        </View>


      </View>
      <View style={{marginTop:10}}>
      <Footer/>
      </View>
     



    </ScrollView>
  )
}

export default ShopNow

const styles = StyleSheet.create({})