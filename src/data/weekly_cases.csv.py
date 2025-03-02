# Prepare weekly measles data.

import pandas as pd
import sys

# Read the CSV
df = pd.read_csv("src/data/weekly-cases-states-2023-2025.csv")

df['year'] = pd.to_datetime(df['week_start']).dt.year

df['week'] = pd.to_datetime(df['week_start']).dt.isocalendar().week

df_output = df[['week_start', 'cases', 'year', 'week']]

df_output.to_csv(sys.stdout, index=False)