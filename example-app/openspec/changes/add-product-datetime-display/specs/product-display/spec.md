## ADDED Requirements

### Requirement: Product DateTime Display

All product display components SHALL show the current date and time below the product price. The datetime MUST be displayed in a full datetime format that includes both date and time (e.g., "Dec 23, 2025 at 2:30 PM"). The datetime value SHALL be captured once when the component renders and remain static (no live updates).

#### Scenario: DateTime appears on product card in products list

- **WHEN** user views the products list page
- **THEN** each product card displays the current datetime below the price

#### Scenario: DateTime appears on product details page

- **WHEN** user views a single product details page
- **THEN** the product details show the current datetime below the price

#### Scenario: DateTime appears on cart items

- **WHEN** user views their shopping cart
- **THEN** each cart item displays the current datetime below the price

#### Scenario: DateTime appears on wishlist items

- **WHEN** user views their wishlist
- **THEN** each wishlist item displays the current datetime below the price

#### Scenario: DateTime format is human-readable

- **WHEN** the datetime is displayed
- **THEN** it uses a localized full datetime format (e.g., "Dec 23, 2025 at 2:30 PM")

#### Scenario: DateTime is static snapshot

- **WHEN** user stays on the page for an extended period
- **THEN** the displayed datetime does not update (remains as captured when component rendered)
