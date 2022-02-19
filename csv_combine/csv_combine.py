import os
import glob
import pandas as pd
os.chdir("/Users/troyspringmeadows/Documents/SpringSemester2022/cs5124/csv_combine/csv_files")

extension = 'csv'
all_filenames = [i for i in glob.glob('*.{}'.format(extension))]

combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames])

combined_csv.to_csv("bad_air.csv", index=False, encoding='utf-8-sig')