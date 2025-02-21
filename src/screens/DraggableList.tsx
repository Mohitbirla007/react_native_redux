import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

const SOUND_OF_SILENCE = ['hello', 'darkness', 'my', 'old', 'friend'];

export default function DraggableList() {
  const [data, setData] = useState(SOUND_OF_SILENCE);

  function keyExtractor(str: string, _index: number) {
    return str;
  }

  function renderItem(info: DragListRenderItemInfo<string>) {
    const {item, onDragStart, onDragEnd, isActive} = info;

    return (
      <View>
        <Text>{item}</Text>
        <TouchableOpacity 
          key={item}
          onPressIn={onDragStart}
          onPressOut={onDragEnd}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <Text>{"|||"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  return (
    <View>
      <DragList
        data={data}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>
  );
}