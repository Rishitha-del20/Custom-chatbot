from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load CSVs once at startup
products_df = pd.read_csv('../data/products.csv')
orders_df = pd.read_csv('../data/orders.csv')
order_items_df = pd.read_csv('../data/order_items.csv')
inventory_items_df = pd.read_csv('../data/inventory_items.csv')

@app.route('/top-products', methods=['GET'])
def top_products():
    merged = order_items_df.merge(products_df, left_on='product_id', right_on='id')
    top = (
        merged.groupby(['product_id', 'name'])
        .agg(total_sold=('quantity', 'sum'))
        .reset_index()
        .sort_values(by='total_sold', ascending=False)
        .head(5)
    )
    return top[['name', 'total_sold']].to_dict(orient='records')

@app.route('/order-status/<order_id>', methods=['GET'])
def order_status(order_id):
    order = orders_df[orders_df['id'].astype(str) == order_id]
    if order.empty:
        return jsonify({'error': 'Order not found'}), 404
    return jsonify(order.iloc[0].to_dict())

@app.route('/inventory/<product_name>', methods=['GET'])
def inventory(product_name):
    match = products_df[products_df['name'].str.lower() == product_name.lower()]
    if match.empty:
        return jsonify({'error': 'Product not found'}), 404
    product_id = match.iloc[0]['id']
    stock = inventory_items_df[inventory_items_df['product_id'] == product_id]['quantity'].sum()
    return jsonify({'product': product_name, 'stock': int(stock)})

if __name__ == '__main__':
    app.run(debug=True)
