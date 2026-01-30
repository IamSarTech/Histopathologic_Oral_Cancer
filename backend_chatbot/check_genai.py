from google import genai

print("GENAI FILE:", genai.__file__)
print("GENAI VERSION:", getattr(genai, "__version__", "NO VERSION ATTR"))
