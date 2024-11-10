import requests
import json

# URI_ENCODE_Q = True

def get_species_by_vernacular(vernacular_name: str) -> dict:
    # if URI_ENCODE_Q:
    res = requests.get(f"https://api.gbif.org/v1/species/search?q={requests.utils.quote(f"vernacularName={vernacular_name}")}")
    # else:
    #     res = requests.get(f"https://api.gbif.org/v1/species/search?q=\"vernacularName={vernacular_name}\"")
    return res.json()

def get_species(key) -> dict:
    res = requests.get(f"https://api.gbif.org/v1/species/{key}")
    return res.json()

# def get_map(taxon_key, start_year, end_year):
#     res = requests.get(f"https://api.gbif.org/v2/map/occurrence/density/0/0/0@1x.png?&style=green.point&taxonKey={taxon_key}&year={start_year},{end_year}")
#     return res

# def taxon_id(species: dict) -> str:
#     for result in species["results"]:
#         if "taxonID" in result:
#             return result["taxonID"]

def taxon_key(species: dict) -> str:
    return species["results"][0]["key"]

# species = get_species("cat")
# print(json.dumps(species, indent=4))
# print(json.dumps(taxon_key(species), indent=4))