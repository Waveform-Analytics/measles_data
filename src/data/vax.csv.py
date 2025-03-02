# Prepare weekly measles data.

import pandas as pd
import sys
from scipy import stats

# Read the CSV
df = pd.read_csv("src/data/percent-vaxxed-years-states.csv")

## For pycharm debugging
# df = pd.read_csv("percent-vaxxed-years-states.csv")

# Clean the data
df['estimate_pct'] = df['estimate_pct'].str.rstrip('%').astype('float') / 100.0

# Extract year from school_year (take first year of school year range)
df['year'] = df['school_year'].str[:4].astype(int)

# Initialize dictionary to store results
results = []

# Calculate trendline for each state
for state in df['geography'].unique():
    state_data = df[df['geography'] == state].sort_values('year').dropna()
    if len(state_data) > 1:  # Need at least 2 points for a trendline
        # Calculate trendline
        slope, intercept, r_value, p_value, std_err = stats.linregress(
            state_data['year'], state_data['estimate_pct'])

        # Calculate first and last predicted values
        first_year = state_data['year'].min()
        last_year = state_data['year'].max()
        first_predicted = slope * first_year + intercept
        last_predicted = slope * last_year + intercept

        # Calculate percent change
        pct_change = ((last_predicted - first_predicted) / first_predicted) * 100

        results.append({
            'geography': state,
            'percent_change': pct_change,
            'slope': slope,
            'r_squared': r_value ** 2,
            'years_of_data': len(state_data)
        })

# Convert results to DataFrame
results_df = pd.DataFrame(results)

# Sort by absolute percent change to see biggest changes
results_df = results_df.sort_values('percent_change', ascending=False)

# Output results
results_df.to_csv(sys.stdout, index=False)