import pandas as pd
from db import Session, Product, InventoryItem, Order, OrderItem, init_db

def load_csv_to_db():
    init_db()
    session = Session()

    # Load products
    products = pd.read_csv('../data/products.csv')
    for _, row in products.iterrows():
        session.add(Product(id=row['id'], name=row['name'], description=row.get('description', '')))

    # Load inventory
    inventory = pd.read_csv('../data/inventory_items.csv')
    for _, row in inventory.iterrows():
        session.add(InventoryItem(id=row['id'], product_id=row['product_id'], quantity=row['quantity']))

    # Load orders
    orders = pd.read_csv('../data/orders.csv', parse_dates=['created_at'])
    for _, row in orders.iterrows():
        session.add(Order(id=row['id'], user_id=row['user_id'], status=row['status'], created_at=row['created_at']))

    # Load order items
    order_items = pd.read_csv('../data/order_items.csv')
    for _, row in order_items.iterrows():
        session.add(OrderItem(id=row['id'], order_id=row['order_id'], product_id=row['product_id'], quantity=row['quantity']))

    session.commit()
    session.close()
    print("Data successfully loaded.")

if __name__ == "__main__":
    load_csv_to_db()
