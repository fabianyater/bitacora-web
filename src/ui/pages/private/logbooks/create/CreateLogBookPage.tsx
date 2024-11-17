import {
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Loader,
  MapPin,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../hooks/useAuth";
import useCurrentLocation from "../../../../../hooks/useCurrentLocation";
import { uploadImage } from "../../../../../services/endpoints/cloudinary";
import { addLogBook } from "../../../../../services/endpoints/logbooks";
import { getLocation } from "../../../../../services/endpoints/weather";
import { LogbookRequest } from "../../../../../utils/types/logbooksTypes";
import styles from "./styles.module.css";

const CreateLogbookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LogbookRequest>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "collectedSpecies",
  });
  const { auth } = useAuthContext();
  const [step, setStep] = useState<number>(1);
  const { location, requestLocation } = useCurrentLocation();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Información General" },
    { id: 2, name: "Clima y Hábitat" },
    { id: 3, name: "Especies Colectadas" },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFileChange = useCallback(
    async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);

        const photosWithUrls = await Promise.all(
          filesArray.map(async (file) => {
            const url = await uploadImage(file);
            return { url, file };
          })
        );

        const currentPhotos = watch(`collectedSpecies.${index}.photos`) || [];

        setValue(`collectedSpecies.${index}.photos`, [
          ...currentPhotos,
          ...photosWithUrls,
        ]);
      }
    },
    [setValue, watch]
  );

  const hasPermission = (
    permissions:
      | Array<{ functionName: string; permissions: string[] }>
      | undefined,
    functionName: string,
    requiredPermission: "read" | "write" | "delete" | "update"
  ) => {
    if (!permissions) return false;

    const functionPermissions = permissions.find(
      (perm) => perm.functionName.toLowerCase() === functionName.toLowerCase()
    );

    return (
      functionPermissions?.permissions.includes(requiredPermission) ?? false
    );
  };

  useEffect(() => {
    if (!hasPermission(auth.permissions, "agregar bitacora", "write")) {
      toast.error("No tienes permisos para acceder a esta página");
      navigate("/", { replace: true }); 
    }
  }, [auth.permissions, navigate]);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const getCuurentLocation = async () => {
        setLoadingLocation(true);
        try {
          const response = await getLocation(latitude, longitude);
          setValue("location.city", response?.location.name);
          setValue("location.country", response?.location.country);
          setValue("location.latitude", response?.location.lat);
          setValue("location.longitude", response?.location.lon);
          setValue("location.region", response.location.region);
          setValue("weather.temperature", response?.current.temp_c);
          setValue("weather.humidity", response?.current.humidity);
          setValue("weather.windSpeed", response?.current.wind_mph);
          setValue("weather.weatherType", response?.current.condition.text);
        } catch (error: unknown) {
          toast.error("Error al cargar la ubicación" + error);
        } finally {
          setLoadingLocation(false);
        }
      };
      getCuurentLocation();
    }
  }, [location, setValue]);

  const onSubmit: SubmitHandler<LogbookRequest> = async (data) => {
    try {
      if (!auth.token) throw new Error("No hay token de autenticación");

      const response = await addLogBook(auth.token, data);
      if (response === 201) {
        toast.success("Bitácora creada exitosamente");
        navigate("/logbooks");
      }
    } catch (error: unknown) {
      toast.error("Error al enviar el formulario" + error);
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <section className={styles.container}>
      <Toaster position="top-right" />
      <nav aria-label="¨Progress" className={styles.steps_navigation}>
        <ol className={styles.steps_item}>
          {steps.map((s) => (
            <li key={s.id}>
              <div className={styles.item}>
                <div
                  className={`${
                    s.id === step
                      ? styles.active
                      : s.id < step
                      ? styles.done
                      : styles.todo
                  }`}
                >
                  {s.id}
                </div>
                <p
                  className={`${styles.text} ${
                    s.id === step ? styles.text_active : styles.gray
                  }`}
                >
                  {s.name}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {step === 1 && (
          <div className={styles.step}>
            <div>
              <label htmlFor="title" className={styles.label}>
                Título
              </label>
              <input
                type="text"
                id="title"
                placeholder="Reservar la Avispa"
                className={styles.input}
                {...register("title", { required: true })}
                {...(errors.title && (
                  <span className="error">Este campo es requerido</span>
                ))}
              />
            </div>
            <div>
              <label htmlFor="date" className={styles.label}>
                Fecha
              </label>
              <input
                type="date"
                id="date"
                className={styles.input}
                defaultValue={new Date().toISOString().split("T")[0]}
                {...register("date", { required: true })}
                {...(errors.date && (
                  <span className="error">Este campo es requerido</span>
                ))}
              />
            </div>
            <div>
              <label htmlFor="location" className={styles.label}>
                Ubicación
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="text"
                  id="location"
                  placeholder="Florencia"
                  className={styles.input}
                  {...register("location.city", { required: true })}
                  {...(errors.location?.city && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => {
                    setLoadingLocation(true);
                    requestLocation();
                  }}
                  disabled={loadingLocation}
                >
                  {loadingLocation ? (
                    <Loader className={styles.loader} />
                  ) : (
                    <MapPin />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="comments" className={styles.label}>
                Observaciones adicionales
              </label>
              <textarea
                style={{ height: "auto" }}
                rows={5}
                id="comments"
                className={styles.input}
                {...register("additionalObservations", { required: true })}
                {...(errors.additionalObservations && (
                  <span className="error">Este campo es requerido</span>
                ))}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <div className={styles.weather_info}>
              <h2 className={styles.subtitle}>Información del cima</h2>
              <button
                type="button"
                className={styles.button}
                onClick={requestLocation}
              >
                <CloudSun />
                Cargar clima
              </button>
            </div>

            <div className={styles.form_section}>
              <div>
                <label htmlFor="temperature" className={styles.label}>
                  Temperatura (ºC)
                </label>
                <input
                  type="number"
                  id="temperature"
                  className={styles.input}
                  {...register("weather.temperature", { required: true })}
                  {...(errors.weather?.temperature && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="humidity" className={styles.label}>
                  Humedad (%)
                </label>
                <input
                  type="number"
                  id="humidity"
                  className={styles.input}
                  {...register("weather.humidity", { required: true })}
                  {...(errors.weather?.humidity && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="windSpeed" className={styles.label}>
                  Velocidad del viento (Km/h)
                </label>
                <input
                  type="number"
                  id="windSpeed"
                  className={styles.input}
                  {...register("weather.windSpeed", { required: true })}
                  {...(errors.weather?.windSpeed && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="weatherType" className={styles.label}>
                  Tipo de clima
                </label>
                <input
                  type="text"
                  id="weatherType"
                  className={styles.input}
                  {...register("weather.weatherType", { required: true })}
                  {...(errors.weather?.weatherType && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div className={styles.expand}>
                <label htmlFor="samplingTime" className={styles.label}>
                  Hora de muestreo
                </label>
                <input
                  type="date"
                  id="samplingTime"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className={styles.input}
                  {...register("weather.samplingTime", { required: true })}
                  {...(errors.weather?.samplingTime && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
            </div>

            <h2 className={styles.subtitle} style={{ marginTop: "2rem" }}>
              Información del Habitat
            </h2>
            <div className={styles.form_section}>
              <div>
                <label htmlFor="vegetationType" className={styles.label}>
                  Tipo de vegetación
                </label>
                <input
                  type="text"
                  id="vegetationType"
                  className={styles.input}
                  {...register("habitat.vegetationType", { required: true })}
                  {...(errors.habitat?.vegetationType && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="altitud" className={styles.label}>
                  Altitud
                </label>
                <input
                  type="number"
                  id="altitud"
                  className={styles.input}
                  {...register("habitat.altitude", { required: true })}
                  {...(errors.habitat?.altitude && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="soilType" className={styles.label}>
                  Tipo de suelo
                </label>
                <input
                  type="text"
                  id="soilType"
                  className={styles.input}
                  {...register("habitat.soilType", { required: true })}
                  {...(errors.habitat?.soilType && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
              <div>
                <label htmlFor="climate" className={styles.label}>
                  Clima
                </label>
                <input
                  type="text"
                  id="climate"
                  className={styles.input}
                  {...register("habitat.climate", { required: true })}
                  {...(errors.habitat?.climate && (
                    <span className="error">Este campo es requerido</span>
                  ))}
                />
              </div>
            </div>
            <div className={styles.expand}>
              <label htmlFor="notes" className={styles.label}>
                Notas sobre el habitat
              </label>
              <textarea
                style={{ height: "auto" }}
                rows={5}
                id="notes"
                className={styles.input}
                {...register("habitat.notes", { required: true })}
                {...(errors.habitat?.notes && (
                  <span className="error">Este campo es requerido</span>
                ))}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <div className={styles.weather_info}>
              <h2 className={styles.subtitle}>Especies Recolectadas</h2>
              <button
                className={styles.button}
                type="button"
                onClick={() =>
                  append({
                    scientificName: "",
                    commonName: "",
                    family: "",
                    sampleQuantity: 0,
                    plantStatus: "",
                    photos: [],
                  })
                }
              >
                <Plus />
                Agregar nueva especie
              </button>
            </div>
            {fields.map((specie, index) => (
              <div key={specie.id} className={styles.species_container}>
                <div>
                  <label
                    htmlFor={`scientificName-${index}`}
                    className={styles.label}
                  >
                    Nombre científico
                  </label>
                  <input
                    type="text"
                    id={`scientificName-${index}`}
                    className={styles.input}
                    {...register(`collectedSpecies.${index}.scientificName`, {
                      required: true,
                    })}
                    {...(errors.collectedSpecies?.[index]?.scientificName && (
                      <span className="error">Este campo es requerido</span>
                    ))}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`commonName-${index}`}
                    className={styles.label}
                  >
                    Nombre común
                  </label>
                  <input
                    type="text"
                    id={`commonName-${index}`}
                    className={styles.input}
                    {...register(`collectedSpecies.${index}.commonName`, {
                      required: true,
                    })}
                    {...(errors.collectedSpecies?.[index]?.commonName && (
                      <span className="error">Este campo es requerido</span>
                    ))}
                  />
                </div>
                <div>
                  <label htmlFor={`family-${index}`} className={styles.label}>
                    Familia
                  </label>
                  <input
                    type="text"
                    id={`family-${index}`}
                    className={styles.input}
                    {...register(`collectedSpecies.${index}.family`, {
                      required: true,
                    })}
                    {...(errors.collectedSpecies?.[index]?.family && (
                      <span className="error">Este campo es requerido</span>
                    ))}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`sampleQuantity-${index}`}
                    className={styles.label}
                  >
                    Cantidad de muestras
                  </label>
                  <input
                    type="number"
                    id={`sampleQuantity-${index}`}
                    className={styles.input}
                    {...register(`collectedSpecies.${index}.sampleQuantity`, {
                      required: true,
                    })}
                    {...(errors.collectedSpecies?.[index]?.sampleQuantity && (
                      <span className="error">Este campo es requerido</span>
                    ))}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`planStatus-${index}`}
                    className={styles.label}
                  >
                    Estado de la planta
                  </label>
                  <input
                    type="text"
                    id={`planStatus-${index}`}
                    placeholder="Viva, Seca, Otra"
                    className={styles.input}
                    {...register(`collectedSpecies.${index}.plantStatus`, {
                      required: true,
                    })}
                    {...(errors.collectedSpecies?.[index]?.plantStatus && (
                      <span className="error">Este campo es requerido</span>
                    ))}
                  />
                </div>
                <div>
                  <label htmlFor={`photos-${index}`} className={styles.label}>
                    Fotos de la especie
                  </label>
                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <input
                      id={`photos-${index}`}
                      type="file"
                      multiple
                      accept="image/*"
                      className={styles.input}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <label
                      className={styles.file_label}
                      htmlFor={`photos-${index}`}
                    >
                      <Upload className={styles.file_icon} />
                      Subir fotos
                    </label>
                  </div>
                  <div className={styles.photos_grid}>
                    {watch(`collectedSpecies.${index}.photos`)?.map(
                      (photo, fileIndex) => (
                        <div
                          key={photo.file?.name}
                          style={{ position: "relative" }}
                        >
                          <img
                            src={photo.url}
                            alt={`Preview ${photo.url}`}
                            className={styles.preview}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPhotos = [
                                ...watch(`collectedSpecies.${index}.photos`),
                              ];
                              newPhotos.splice(fileIndex, 1);
                              setValue(
                                `collectedSpecies.${index}.photos`,
                                newPhotos
                              );
                            }}
                            className={`${styles.delete_button}`}
                            aria-label="Eliminar foto"
                          >
                            <Trash2 className={styles.file_icon} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.button}
                  style={{ backgroundColor: "#ef4444", border: "none" }}
                  onClick={() => remove(index)}
                >
                  <Trash2 className={styles.file_icon} />
                  Eliminar especie
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.control}>
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={`${styles.button} ${styles.back}`}
            >
              <ChevronLeft />
              Anterior
            </button>
          )}
          {step < 3 ? (
            <>
              <div></div>
              <button
                type="button"
                onClick={nextStep}
                className={styles.button}
              >
                Siguiente
                <ChevronRight />
              </button>
            </>
          ) : (
            <button type="submit" className={styles.button}>
              Guardar Bitácora
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreateLogbookForm;
