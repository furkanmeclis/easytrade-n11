import React from "react";
import { Provider } from "react-redux";
import CategoryTree from "./CategoryTree";
import store from "./store";
import { Formik, Field as Input, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "./newProductSlice";
import Select from "react-select";
const Component = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories);
  const [step, setStep] = React.useState(1);
  const prev = () => {
    setStep(step - 1);
  };
  const next = () => {
    setStep(step + 1);
  };
  React.useEffect(() => {
    console.log(step);
  }, [step]);
  const ImportantStar = () => {
    return <span style={{ color: "red", fontWeight: 600 }}>*</span>;
  };
  const Field = ({
    required = false,
    col = 4,
    type = "text",
    label = null,
    name = null,
    handleChange = null,
    values = null,
    attributes = {},
    element = false,
    children = null,
  }) => {
    return (
      <div className={"col-md-" + col}>
        <div className="mb-3">
          <label className="form-label">
            {label} {required && <ImportantStar />}
          </label>
          {element ? (
            children
          ) : (
            <input
              className="form-control"
              type={type}
              value={values !== null ? values[name] : attributes.value()}
              onChange={handleChange}
              name={name}
              {...attributes}
            />
          )}
        </div>
      </div>
    );
  };
  const pageCount = 4;
  const currencyType = (type) => {
    switch (type) {
      case 1:
        return "TL";
        break;
      case 2:
        return "USD";
        break;
      case 3:
        return "EUR";
        break;
      default:
        break;
    }
  };
  const Card = ({ children, page, title }) => {
    return (
      <div
        className={page === step ? "row" : "d-none"}
        style={{ transition: "300ms all" }}
      >
        <div className="col-md-12 d-flex justify-content-center mb-3">
          <h4>{title}</h4>
        </div>
        {children}
        <div className="col-md-12 d-flex justify-content-between">
          {page !== 1 && (
            <button type="button" className="btn btn-warning" onClick={prev}>
              Geri
            </button>
          )}
          {page === 1 && <div></div>}
          {pageCount === step && (
            <>
              <button type="submit" className="btn btn-success">
                Kaydet
              </button>
            </>
          )}
          <button
            type="button"
            disabled={pageCount === step}
            className={
              "btn btn-" + (pageCount === step ? "secondary" : "success")
            }
            onClick={next}
          >
            ??leri
          </button>
        </div>
      </div>
    );
  };
  const Progress = () => {
    const widthCount = ((step - 1) / pageCount) * 100;
    return (
      <>
        {step - 1 === 0 ? (
          <></>
        ) : (
          <div className="progress mt-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: widthCount + "%", transition: "300ms width" }}
            >
              {widthCount}%
            </div>
          </div>
        )}
      </>
    );
  };
  const categoryAttributes = useSelector((state) => state.data.attributes);
  return (
    <Formik
      initialValues={{
        productSellerCode: "",
        title: "",
        subtitle: "",
        description: "",
        categoryId: "",
        price: "",
        currencyType: 1,
        saleStartDate: "",
        saleEndDate: "",
        productionDate: "",
        expirationDate: "",
        productCondition: "",
        preparingDay: "",
        domestic: false,
        discount: {
          discountType: 1,
          discountValue: "",
          discountStartDate: "",
          discountEndDate: "",
        },
        attributes: {
          attribute: [],
        },
        sellerNote: "",
        discountApply: "uygulama",
        stockItems: {
          stockItem: {
            quantity: 0,
            sellerStockCode: "",
            optionPrice: "",
            mpn: "",
            gtin: "",
            oem: "",
            n11CatalogId: "",
            maxPurchaseQuantity: 0,
          },
        },
      }}
      onSubmit={(e) => console.log(e)}
    >
      {({
        isSubmitting,
        getFieldProps,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
      }) => (
        <Form>
          <Card page={1} title="Temel Bilgiler">
            <Field
              required
              handleChange={handleChange}
              values={values}
              name="productSellerCode"
              label="Ma??aza Kodu"
            />
            <Field
              required
              handleChange={handleChange}
              values={values}
              name="title"
              label="Ba??l??k"
              attributes={{ maxLength: 65 }}
            />
            <Field
              required
              handleChange={handleChange}
              values={values}
              name="subtitle"
              label="Alt Ba??l??k"
              attributes={{ maxLength: 65 }}
            />
            <Field required element label="??r??n Kategorisi">
              <Select
                isClearable
                placeholder="??r??n Kategorisi"
                options={categories.categoryList.category.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                onChange={(e) => {
                  setFieldValue("categoryId", e !== null ? e.value : null);
                  dispatch(setSelectedCategory(e !== null ? e.value : null));
                }}
              />
            </Field>
            <Field
              required
              handleChange={handleChange}
              values={values}
              name="price"
              label="??r??n Baz Fiyat??"
              type="number"
            />
            <Field required element label="Para Birimi">
              <Select
                isClearable={false}
                placeholder="Para Birimi"
                defaultValue={{ value: 1, label: "TL" }}
                options={[
                  { value: 1, label: "TL" },
                  { value: 2, label: "USD" },
                  { value: 3, label: "EUR" },
                ]}
                onChange={(e) => setFieldValue("currencyType", e.value)}
              />
            </Field>
            <Field
              handleChange={(e) => {
                let [year, month, day] = e.target.value.split("-");
                setFieldValue("saleStartDate", `${day}/${month}/${year}`);
              }}
              attributes={{
                value: () => {
                  if (!values.saleStartDate === null) return "";
                  let [day, month, year] = values.saleStartDate.split("/");
                  return `${year}-${month}-${day}`;
                },
              }}
              name="saleStartDate"
              label="Sat???? Ba??lang???? Tarihi"
              type="date"
            />
            <Field
              handleChange={(e) => {
                let [year, month, day] = e.target.value.split("-");
                setFieldValue("saleEndDate", `${day}/${month}/${year}`);
              }}
              attributes={{
                value: () => {
                  if (!values.saleEndDate === null) return "";
                  let [day, month, year] = values.saleEndDate.split("/");
                  return `${year}-${month}-${day}`;
                },
              }}
              name="saleEndDate"
              label="Sat???? Biti?? Tarihi"
              type="date"
            />
            <Field required element label="??r??n Durumu">
              <Select
                isClearable={false}
                placeholder="??r??n Durumu"
                defaultValue={{ value: 1, label: "Yeni" }}
                options={[
                  { value: 1, label: "Yeni" },
                  { value: 2, label: "2.El" },
                ]}
                onChange={(e) => setFieldValue("productCondition", e.value)}
              />
            </Field>
          </Card>
          <Card page={2} title="??r??n Bilgileri">
            {/* ??lk Part */}
            <Field
              handleChange={(e) => {
                let [year, month, day] = e.target.value.split("-");
                setFieldValue("productionDate", `${day}/${month}/${year}`);
              }}
              attributes={{
                value: () => {
                  if (!values.productionDate === null) return "";
                  let [day, month, year] = values.productionDate.split("/");
                  return `${year}-${month}-${day}`;
                },
              }}
              name="productionDate"
              label="??r??n ??retim Tarihi"
              type="date"
            />
            <Field
              handleChange={(e) => {
                let [year, month, day] = e.target.value.split("-");
                setFieldValue("expirationDate", `${day}/${month}/${year}`);
              }}
              attributes={{
                value: () => {
                  if (!values.expirationDate === null) return "";
                  let [day, month, year] = values.expirationDate.split("/");
                  return `${year}-${month}-${day}`;
                },
              }}
              name="expirationDate"
              label="??r??n Son Kullan??m Tarihi"
              type="date"
            />

            <Field
              required
              handleChange={handleChange}
              values={values}
              name="preparingDay"
              label="Haz??rlanma S??resi(G??n)"
              type="number"
            />
            <Field element label="Yerli ??retim Durumu">
              <Select
                isClearable={false}
                placeholder="Yerli ??retim Durumu"
                options={[
                  { value: true, label: "Yerli ??retim" },
                  { value: false, label: "Yerli ??retim De??il" },
                ]}
                onChange={(e) => setFieldValue("domestic", e.value)}
              />
            </Field>
            <Field element required label="??ndirim">
              <Select
                isClearable={false}
                placeholder="??ndirim"
                defaultValue={{ value: "uygulama", label: "??ndirim Uygulama" }}
                options={[
                  { value: "uygula", label: "??ndirim Uygula" },
                  { value: "uygulama", label: "??ndirim Uygulama" },
                ]}
                onChange={(e) => {
                  setFieldValue("discountApply", e.value);
                }}
              />
            </Field>
            {values.discountApply === "uygula" && (
              <>
                <Field element required label="??ndirim Tipi">
                  <Select
                    isClearable={false}
                    placeholder="??ndirim Tipi"
                    defaultValue={{
                      value: 1,
                      label: "??ndirim Tutar?? Cinsinden",
                    }}
                    options={[
                      { value: 1, label: "??ndirim Tutar?? Cinsinden" },
                      { value: 2, label: "??ndirim Oran?? Cinsinden" },
                      { value: 3, label: "??ndirimli Fiyat Cinsinden" },
                    ]}
                    onChange={(e) =>
                      setFieldValue("discount.discountType", e.value)
                    }
                  />
                </Field>
                <Field
                  label={
                    values.discount.discountType === 2
                      ? "??ndirim Y??zdesi (%)"
                      : "??ndirim Miktar?? (" +
                        currencyType(values.currencyType) +
                        ")"
                  }
                  required
                  name="discount.discountValue"
                  handleChange={handleChange}
                  values={values}
                  type="number"
                />
                <Field
                  handleChange={(e) => {
                    let [year, month, day] = e.target.value.split("-");
                    setFieldValue(
                      "discount.discountStartDate",
                      `${day}/${month}/${year}`
                    );
                  }}
                  required
                  attributes={{
                    value: () => {
                      if (!values.discount.discountStartDate === null)
                        return "";
                      let [year, month, day] =
                        values.discount.discountStartDate.split("/");
                      return `${year}-${month}-${day}`;
                    },
                  }}
                  name="discount.discountStartDate"
                  label="??ndirim Ba??lama Tarihi"
                  type="date"
                />
                <Field
                  handleChange={(e) => {
                    let [year, month, day] = e.target.value.split("-");
                    setFieldValue(
                      "discount.discountEndDate",
                      `${day}/${month}/${year}`
                    );
                  }}
                  required
                  attributes={{
                    value: () => {
                      if (!values.discount.discountEndDate === null) return "";
                      let [year, month, day] =
                        values.discount.discountEndDate.split("/");
                      return `${year}-${month}-${day}`;
                    },
                  }}
                  name="discount.discountEndDate"
                  label="??ndirim Sonlanma Tarihi"
                  type="date"
                />
              </>
            )}
            <Field
              required
              handleChange={handleChange}
              values={values}
              name="sellerNote"
              label="Sat??c?? Notu"
            />
          </Card>
          <Card page={3} title="??r??n Detay??">
            <Field
              label="Ma??aza ??r??n Stok Kodu"
              name="stockItems.stockItem.sellerStockCode"
              handleChange={handleChange}
              values={values}
            />
            <Field
              label="Stok Birim Fiyat??"
              name="stockItems.stockItem.optionPrice"
              handleChange={handleChange}
              values={values}
            />
            <Field
              label="??retici Par??a Numaras??"
              name="stockItems.stockItem.mpn"
              handleChange={handleChange}
              values={values}
            />
            <Field
              label="Global Ticari ????e Numaras??"
              name="stockItems.stockItem.gtin"
              handleChange={handleChange}
              values={values}
            />
            <Field
              label="Par??a/??r??n Ba??lant?? Numaras??"
              name="stockItems.stockItem.oem"
              handleChange={handleChange}
              values={values}
            />
            <Field
              label="N11 Katalog Numaras??"
              name="stockItems.stockItem.n11CatalogId"
              handleChange={handleChange}
              values={values}
            />
          </Card>
          <Card page={4} title="??r??n ??zellikleri">
            {categoryAttributes.map((attribute, i) => (
              <Field
                element
                label={attribute.name}
                required={attribute.mandatory}
              >
                <Select
                  key={attribute.id}
                  placeholder={attribute.name}
                  isMulti={attribute.multipleSelect}
                  options={attribute.valueList.value.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  onChange={(e) => {
                    if (categoryAttributes.length === 1) {
                      if (attribute.multipleSelect) {
                        let valuese = e.map((s) => s.label).join(",");
                        setFieldValue(
                          "attributes.attribute.name",
                          attribute.name
                        );
                        setFieldValue("attributes.attribute.value", valuese);
                      } else {
                        setFieldValue(
                          "attributes.attribute.name",
                          attribute.name
                        );
                        setFieldValue("attributes.attribute.value", e.label);
                      }
                      return;
                    }

                    if (attribute.multipleSelect) {
                      let valuese = e.map((s) => s.label).join(",");
                      setFieldValue(
                        "attributes.attribute[" + i + "].name",
                        attribute.name
                      );
                      setFieldValue(
                        "attributes.attribute[" + i + "].value",
                        valuese
                      );
                    } else {
                      setFieldValue(
                        "attributes.attribute[" + i + "].name",
                        attribute.name
                      );
                      setFieldValue(
                        "attributes.attribute[" + i + "].value",
                        e.label
                      );
                    }
                  }}
                  isClearable={false}
                  isSearchable
                />
              </Field>
            ))}
          </Card>
          <Progress />
        </Form>
      )}
    </Formik>
  );
};

export default Component;
