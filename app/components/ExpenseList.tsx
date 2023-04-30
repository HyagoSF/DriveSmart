// This component is going to be a component to display the list of work related expenses for the user to see.
// It will be a list of ExpenseItem components.

import React from 'react';


export default ExpenseList = ({ expenses }) => {
    return (
        <View style={styles.expenseList}>
        <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseItem expense={item} />}
            keyExtractor={(item) => item.id}
        />
        </View>
    );
    };
