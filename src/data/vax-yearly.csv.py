# Prepare weekly measles data.

import pandas as pd
import numpy as np
import sys

# Read the CSV
df = pd.read_csv("src/data/percent-vaxxed-years-states.csv")

# Clean the data
df['estimate_pct'] = df['estimate_pct'].str.rstrip('%').astype('float') / 100.0

# Extract year from school_year (take first year of school year range)
df['year'] = df['school_year'].str[:4].astype(int)

# Compute # vaccinated using percent and population_size
df['n_vaccinated'] = df['estimate_pct'] * df['population_size']

# Calculate nationwide statistics by year, dropping NaNs
nationwide = df.groupby('year').agg({
    'population_size': 'sum',
    'n_vaccinated': 'sum',
    'estimate_pct': ['mean', 'std', 'count']  # Add summary statistics
}).reset_index()

# Flatten multi-level columns
nationwide.columns = ['year', 'population_size', 'n_vaccinated',
                     'mean_pct', 'std_pct', 'state_count']

# Calculate the overall vaccination rate and standard error
nationwide['estimate_pct'] = nationwide['n_vaccinated'] / nationwide['population_size']
nationwide['std_error'] = nationwide['std_pct'] / np.sqrt(nationwide['state_count'])

# Calculate 95% confidence intervals
nationwide['ci_lower'] = nationwide['estimate_pct'] - (1.96 * nationwide['std_error'])
nationwide['ci_upper'] = nationwide['estimate_pct'] + (1.96 * nationwide['std_error'])

# Create school year column
nationwide['school_year'] = nationwide['year'].astype(str) + '-' + (nationwide['year'] + 1).astype(str)

# Reorder and select final columns
final_columns = ['school_year', 'year', 'population_size', 'n_vaccinated',
                'estimate_pct', 'std_pct', 'std_error', 'ci_lower', 'ci_upper',
                'state_count']
nationwide = nationwide[final_columns]

# Remove any rows where we don't have complete data
nationwide = nationwide.dropna()

# Output results
nationwide.to_csv(sys.stdout, index=False)