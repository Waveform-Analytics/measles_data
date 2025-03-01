# Prepare the annual measles data. Extract data 1985-Present.
# This data loader exports a dataframe with year and cases, both stored as numbers

import pandas as pd
import sys

# Read the CSV
df = pd.read_csv("src/data/measles-cases.csv")

df_sub = df[df['filter'] == "1985-Present*"]

df_out = df_sub[['year', 'cases']]

# Write to CSV
df_out.to_csv(sys.stdout, index=False)