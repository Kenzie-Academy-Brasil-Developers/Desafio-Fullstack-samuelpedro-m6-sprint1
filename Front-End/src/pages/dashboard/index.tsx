import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthDashboard } from "../../hooks/useDashboard";
import styles from "./dashboard.module.scss";
import { DashboardData, schema } from "./validator";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface allContacts {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkedContacts, setLinkedContacts] = useState<allContacts[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  const handleLogout = () => {
    setTimeout(() => {
    localStorage.clear();
    toast.success("Deslogando...💻");
    navigate('/login');
  }, 2000);
  };

  const { mainPage } = userAuthDashboard();
  const { register, handleSubmit, setValue, getValues } =
    useForm<DashboardData>({
      resolver: zodResolver(schema),
    });

  const submit = (data: DashboardData) => {
    mainPage(data);
  };

  useEffect(() => {
    const fetchLinkedContacts = async () => {
      try {
        const response = await api.get<allContacts[]>("contacts");
        setLinkedContacts(response.data);
      } catch (error) {
        console.error("Erro ao obter contatos vinculados", error);
      }
    };

    if (isModalOpen) {
      fetchLinkedContacts();
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (contact: allContacts) => {
    setValue("fullName", contact.fullName);
    setValue("email", contact.email);
    setValue("telephone", contact.telephone);

    setSelectedContactId(contact.id);
    setEditModalOpen(true);
  };

  const handleEditContact = async (contactId: string) => {
    try {
      const storedToken = localStorage.getItem("your-login:token");

      if (storedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }
    
      const formData = getValues();

      await api.patch(`/contacts/${contactId}`, formData);

      setEditModalOpen(false);

      setLinkedContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, ...formData } : contact
        )
      );

      toast.success("Contato editado com sucesso! 📞");
    } catch (error) {
      console.error("Erro ao editar contato:", error);
      toast.error(
        "Erro ao editar contato. Verifique se os dados estão corretos!"
      );
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      const storedToken = localStorage.getItem("your-login:token");

      if (storedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }

      await api.delete(`/contacts/${contactId}`);
      const updatedContacts = linkedContacts.filter(
        (contact) => contact.id !== contactId
      );
      setLinkedContacts(updatedContacts);
      toast.success("Contato deletado com sucesso! 🗑️");
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
      toast.error(
        "Erro ao deletar contato. Verifique se o contato já não foi deletado!"
      );
    }
  };

  return (
    <main>
      <header className={styles.header}>
        
        <h1 className={styles.title__dashboard}>
          Bem-vindo à Pagina principal da NetworkSync 🌐 <br />
        </h1>

        <h2 className={styles.Subtitle__dashboard}>
          fique a vontate para vincular seus contatos á sua lista de contatos
        </h2>

        <div className={styles.div_button_logout}>
        <button type="button" onClick={handleLogout} className={styles.button_logout}>
          Logout
        </button>
      </div>
      </header>

      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <label htmlFor="fullName" className={styles.label}>
          Nome completo
        </label>
        <input
          type="fullName"
          id="fullName"
          {...register("fullName")}
          className={styles.input}
        />

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={styles.input}
        />

        <label htmlFor="telephone" className={styles.label}>
          Telefone
        </label>
        <input
          type="telephone"
          id="telephone"
          {...register("telephone")}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Vincular contato
        </button>

        <div className={styles.div_allContacts}>
          <h2 className={styles.div_contacts_title}>
            Quer ver os seus contatos vinculados?
          </h2>

          <h2 className={styles.Subtitle__contacts}>
            Basta apenas clicar no botão logo abaixo 👇
          </h2>

          <button type="button" className={styles.button} onClick={openModal}>
            Ver contatos vinculados
          </button>
        </div>
      </form>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Contatos Vinculados"
        className={styles.custom_modal}
      >
        <h2 className={styles.title_modal}>Contatos Vinculados</h2>
        {linkedContacts.length > 0 ? (
          <ul className={styles.ul_cards}>
            {linkedContacts.map((contact, index) => (
              <li key={index} className={styles.li_cards}>
                <h2 className={styles.descripition_data}>
                  Nome:{contact.fullName}
                </h2>
                <h2 className={styles.descripition_data}>
                  Email: {contact.email}
                </h2>
                <h2 className={styles.descripition_data}>
                  Telefone: {contact.telephone}
                </h2>
                <button
                  onClick={() => openEditModal(contact)}
                  className={styles.button_modal_edit}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className={styles.button_modal_delete}
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.p_descripition_modal}>
            Nenhum contato vinculado
          </p>
        )}
        <button onClick={closeModal} className={styles.button_closeModal}>
          Fechar Modal
        </button>
      </ReactModal>

      <ReactModal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Editar Contato"
        className={styles.custom_modal_edit}
      >
        <h2 className={styles.title_modal_edit}>Editar Contato</h2>
        
        <form onSubmit={handleSubmit(submit)} className={styles.form_edit}>
          <div className={styles.div_form_name}>
            <label htmlFor="fullName" className={styles.label_edit}>
              Nome:
            </label>

            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              className={styles.input_edit}
            />
          </div>

          <div className={styles.div_form_email}>
            <label htmlFor="email" className={styles.label_edit}>
              Email:
            </label>

            <input
              type="email"
              id="email"
              {...register("email")}
              className={styles.input_edit}
            />
          </div>

          <div className={styles.div_form_telephone}>
            <label htmlFor="telephone" className={styles.label_edit}>
              Telefone:
            </label>

            <input
              type="text"
              id="telephone"
              {...register("telephone")}
              className={styles.input_edit}
            />
          </div>

          <button
            type="button"
            onClick={() =>
              selectedContactId && handleEditContact(selectedContactId)
            }
            className={styles.button_closeModal}
          >
            Editar Contato
          </button>

        <button
          onClick={() => setEditModalOpen(false)}
          className={styles.button_closeModal}
        >
          Fechar Modal
        </button>

        </form>
      </ReactModal>
    </main>
  );
};
