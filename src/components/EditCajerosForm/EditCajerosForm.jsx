import React, { useState, useContext, useEffect, forwardRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { animateScroll } from "react-scroll";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { adminContext, solana } from "../../storage/AdminContext";
import { toastError, toastInfo, toastSuccess } from "../../helpers/helpers";
import Firebase from "../../classes/Firebase";
import { MainButton } from "../UI/MainButton";

const updateLocalChecker = (actualChecherInfo, newCheckerInfo) => {
  actualChecherInfo.red = newCheckerInfo.red;
  actualChecherInfo.nombre = newCheckerInfo.nombre;
  actualChecherInfo.genero = newCheckerInfo.genero;
  actualChecherInfo.estado = newCheckerInfo.estado;
  actualChecherInfo.numero = newCheckerInfo.numero;
  actualChecherInfo.enlace = newCheckerInfo.enlace;
  actualChecherInfo.pos = newCheckerInfo.pos;
};

const updateFormData = async (
  actualCheckerData,
  formCheckerData,
  laQuiereBorrar
) => {
  if (actualCheckerData._image == null) {
    // LLEGA SIN IMAGEN
    if (formCheckerData._image?.length > 0) {
      // AGREGO NUEVA
      // LLEGON SIN --> SE VA CON
      await Firebase.uploadCashierImageDB(formCheckerData._image[0])
        .then((resultado) => {
          let { url, randomId } = resultado;
          formCheckerData._image = {
            url,
            randomId,
          };
          actualCheckerData._image = formCheckerData._image;
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      // NO AGREGO NUEVA
      // LLEGON SIN --> SE VA SIN
      formCheckerData._image = null;
    }
  } else if (actualCheckerData._image != null) {
    if (laQuiereBorrar) {
      if (formCheckerData._image.length > 0) {
        // LA BORRO PERO AGREGO OTRA
        await Firebase.deleteCashierImg(
          actualCheckerData._image.randomId
        ).catch((error) => {
          toastError(error.message);
        });
        await Firebase.uploadCashierImageDB(formCheckerData._image[0])
          .then((resultado) => {
            let { url, randomId } = resultado;
            formCheckerData._image = {
              url,
              randomId,
            };
          })
          .catch((error) => {
            toastError(error.message);
          });
      } else {
        // LA BORRO PERO NO AGREGO OTRA
        await Firebase.deleteCashierImg(actualCheckerData._image.randomId)
          .then(() => {
            formCheckerData._image = null;
          })
          .catch((error) => {
            toastError(error.message);
          });
      }
    } else {
      // NO LA QUIERE BORRAR
      formCheckerData._image = actualCheckerData._image;
    }
  } else {
    // NO DEBERIA ENTRAR ACA
    toastError("Ocurrió un error. Reintente nuevamente.");
  }
};

const buildCashierObject = (data, cashierId) => {
  data.pos--;
  return {
    _link: data.enlace,
    _state: data.estado,
    _genre: data.genero,
    _image: data.imagen,
    _name: data.nombre,
    _number: String(data.numero),
    _position: Number(data.pos),
    _network: data.red,
    _id: cashierId,
  };
};

const isNewPositionOk = (newPosition) => {
  return newPosition >= 1 && newPosition <= solana.cajeros.length;
};

export const EditCajerosForm = ({ onClose, show, cajeroData, cajeroIndex }) => {
  const [laQuiereBorrar, setLaQuiereBorrar] = useState(false);
  const [error, setError] = useState("");

  const scrollToTop = () => {
    const scrollDuration = 200; // Duración de la animación en milisegundos
    const scrollOffset = -100; // Desplazamiento adicional opcional

    animateScroll.scrollToTop({
      duration: scrollDuration,
      offset: scrollOffset,
    });
  };

  useEffect(() => {
    if (cajeroData._image == null) setLaQuiereBorrar(true);
  }, []);

  const { cashiers, setCashiers, setIsLoading, c_getCashiers } =
    useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary mx-2",
      cancelButton: "btn btn-danger",
      denyButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  /*
    1) saber si se cambio de posición
    Sí cambió, 
    ---
    Case 1: Llegó sin imagén, se va con imagén
    Case 2: Llegó sin imagén, se va sin imagén
    Case 3: Llegó con imagén, la cambió y se va con imagén
    Case 4: Llegó con imagén, se va sin imagén
  */

  const updateInfo = (buildedCashier) => {
    let esPosicionCambiada = false;
    if (cajeroData._position != buildedCashier._position)
      esPosicionCambiada = true;
    updateFormData(cajeroData, buildedCashier, laQuiereBorrar)
      .then(() => {
        if (esPosicionCambiada) {
          let cashiersUpdated = solana.moveCashierPosition(
            buildedCashier._position,
            buildedCashier
          );
          // let newArray = moveCajerosPosition(data.pos, data, copyCajeros);
          setCashiers(cashiersUpdated);
          setIsLoading(true);
          scrollToTop();
          Firebase.updateAllCajeros(cashiersUpdated)
            .then(() => {
              toastSuccess("FIREBASE: Cajeros actualizados.");
              c_getCashiers();
              onClose();
              toastSuccess("Cajero actualizado correctamente.");
            })
            .catch((error) => {
              toastError(error.message);
            });
        } else {
          // NO CAMBIO POSICION
          setIsLoading(true);
          updateLocalChecker(cajeroData, buildedCashier);
          scrollToTop();
          Firebase.updateCashierInfo(cajeroData._id, buildedCashier).then(
            () => {
              c_getCashiers();
              onClose();
              toastSuccess("Cajero actualizado correctamente.");
            }
          );
        }
      })
      .catch((error) => {
        console.log("error en updateFormData()");
        toastError(error.message);
      });
  };

  const onSubmit = (data) => {
    setError("");
    if (!isNewPositionOk(Number(data.pos))) {
      setError(`Selecciona una posición entre 1 y ${solana.cajeros.length}.`);
      return;
    }
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro que quieres actualizar la información?",
        text: "Los cambios no se pueden deshacer.",
        showDenyButton: true,
        denyButtonText: `No guardar`,
        confirmButtonText: "Guardar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateInfo(buildCashierObject(data, cajeroData._id));
          toastSuccess("Información editada correctamente!");
        } else if (result.isDenied) {
          onClose();
          toastInfo("No se guardaron los cambios.");
        }
      });
  };

  const deleteHandler = () => {
    setLaQuiereBorrar(true);
    Firebase.deleteCashierImg(cajeroData._image.randomId)
      .then(() => {
        cajeroData._image = null;
        Swal.fire(
          "Se quitó la imagen.",
          "Si guarda los cambios se aplicarán y no se puede deshacer. Si desea cancelar el cambio, cancele los cambios.",
          "success"
        );
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  return (
    <AddForm
      className="gap-1 d-flex flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <NetworkAndNameRow cajero={cajeroData} register={register} />
      <GenreRow cajero={cajeroData} register={register} />
      <StateRow cajero={cajeroData} register={register} />
      <PhoneAndPositionRow
        cajero={cajeroData}
        cajeroIndex={cajeroIndex}
        register={register}
      />
      <LinkRow cajero={cajeroData} register={register} />

      {!laQuiereBorrar ? (
        <>
          <div className="d-flex flex-column justify-content-evenly flex-wrap col-12 p-0 imagenContainer gap-2 mt-1">
            <TextContainer className="d-flex justify-content-between align-items-center">
              <p className="p-0 m-0 mb-1">Imagen actual:</p>
              <MainButton onClick={() => deleteHandler()}>
                Borrar imagen
                <BsFillTrashFill />
              </MainButton>
            </TextContainer>
            <div className="col-6 m-auto p-0 m-0 mt-1">
              <CajeroPhoto
                src={cajeroData._image?.url}
                alto="fotito"
                className="p-0 m-0"
              />
            </div>
            <div className="col-6 p-0 px-3 d-flex flex-column justify-content-evenly"></div>
          </div>
        </>
      ) : (
        <>
          <InputContainer3 className="col-12">
            <StyledInput type="file" name="imagen" {...register("imagen")} />
          </InputContainer3>
        </>
      )}

      <SubmitContainer className="d-flex flex-column flex-wrap py-3 gap-2">
        <div className="text-center">
          <p className="text-danger m-0 p-0">{error}</p>
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <MainButton
            onClick={() => {
              onClose();
              toastInfo("No se guardaron los cambios.");
            }}
          >
            Cancelar
          </MainButton>
          <MainButton type="submit" primary={true}>
            Guardar cambios
          </MainButton>
        </div>
      </SubmitContainer>
    </AddForm>
  );
};

export default EditCajerosForm;

const NetworkAndNameRow = ({ cajero, register }) => {
  return (
    <div className="col-12 d-flex flex-column flex-md-row gap-2">
      <div className="d-flex flex-column">
        <label htmlFor="red">Red</label>
        <MainInput
          name="red"
          required
          type="text"
          placeholder="Red de cajero"
          defaultValue={cajero._network}
          {...register("red")}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="nombre">Nombre</label>
        <MainInput
          name="nombre"
          required
          type="text"
          placeholder="Nombre"
          defaultValue={cajero._name}
          {...register("nombre")}
        />
      </div>
    </div>
  );
};

const GenreRow = ({ cajero, register }) => {
  return (
    <InputContainer2>
      {/* GENERO*/}
      <div className="d-flex gap-3 pt-1">
        <p className="m-0 d-none d-md-block">Genero:</p>
        <div className="d-flex gap-4 align-items-center">
          {/* OPCION 1 */}
          <div className="d-flex flex-row gap-1">
            <StyledInput
              type="radio"
              value="M"
              defaultChecked={cajero._genre === "M" ? true : false}
              {...register("genero", {
                required: "Selecciona un genero",
              })}
            />
            <p className="m-0">Masculino</p>
          </div>
          {/* OPCION 2 */}
          <div className="d-flex flex-row gap-1">
            <StyledInput
              type="radio"
              value="F"
              defaultChecked={cajero._genre === "F" ? true : false}
              {...register("genero", {
                required: "Selecciona un genero",
              })}
            />
            <p className="m-0">Femenino</p>
          </div>
        </div>
      </div>
    </InputContainer2>
  );
};

const StateRow = ({ cajero, register }) => {
  return (
    <div className="d-flex">
      {/* ESTADO*/}
      <div className="d-flex gap-3">
        <p className="m-0 d-none d-md-block">Estado:</p>
        <div className="d-flex gap-4 align-items-center">
          {/* OPCION 1 */}
          <div className="d-flex flex-row gap-1">
            <StyledInput
              type="radio"
              value="conectado"
              defaultChecked={cajero._state === "conectado" ? true : false}
              {...register("estado", {
                required: "Selecciona un estado",
              })}
            />
            <p className="m-0">Conectado</p>
          </div>
          {/* OPCION 2 */}
          <div className="d-flex flex-row gap-1">
            <StyledInput
              type="radio"
              value="desconectado"
              defaultChecked={cajero._state === "desconectado" ? true : false}
              {...register("estado", {
                required: "Selecciona un estado",
              })}
            />
            <p className="m-0">Desconectado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneAndPositionRow = ({ cajero, cajeroIndex, register }) => {
  return (
    <div className="col-12 d-flex flex-column flex-md-row gap-2">
      <div className="d-flex flex-column">
        <label htmlFor="numero">Teléfono</label>
        <MainInput
          name="numero"
          required
          type="text"
          placeholder="Telefono"
          defaultValue={cajero._phone}
          {...register("numero")}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="pos">Posición</label>
        <MainInput
          defaultValue={cajeroIndex}
          name="pos"
          placeholder="Posición"
          required
          type="number"
          {...register("pos")}
        />
      </div>
    </div>
  );
};

const LinkRow = ({ cajero, register }) => {
  return (
    <div className="col-12 d-flex flex-column">
      {/* ENLACE WHASTAPP */}
      <label htmlFor="enlace">Link</label>
      <MainInput
        name="enlace"
        required
        type="text"
        placeholder="Link de WhatsApp"
        defaultValue={cajero._link}
        {...register("enlace")}
      />
    </div>
  );
};

const MainInput = forwardRef(({ size, ...args }, ref) => {
  let width = "";
  if (size == undefined) {
    width = 12;
  } else {
    width = `col-${size}`;
  }
  return <InputDefaultStyle {...args} className={`${width}`} ref={ref} />;
});

const InputDefaultStyle = styled.input`
  height: 50px;
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 1rem;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000080;
  }
  &::-webkit-input-placeholder {
    color: #00000080;
  }
  &::-moz-placeholder {
    color: #00000080;
  }
  &:-ms-input-placeholder {
    color: #00000080;
  }
  &:-moz-placeholder {
    color: #00000080;
  }
`;

const StyledInput2 = styled.input`
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s all;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000080;
  }
  &::-webkit-input-placeholder {
    color: #00000080;
  }
  &::-moz-placeholder {
    color: #00000080;
  }
  &:-ms-input-placeholder {
    color: #00000080;
  }
  &:-moz-placeholder {
    color: #00000080;
  }
`;

const TextContainer = styled.div`
  width: 100%;
`;

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer1 = styled.div`
  justify-content: space-between;
  display: flex;
`;

const InputContainer2 = styled(InputContainer1)`
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const InputContainer3 = styled(InputContainer1)`
  flex-direction: column;
`;

const SubmitContainer = styled.div`
  border-top: 1px solid #c7c7c7;
  display: flex;
  justify-content: center;
`;

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 5px 10px;
  outline: none;
  border: 0.5px solid #c7c7c7;
`;

const CajeroPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
